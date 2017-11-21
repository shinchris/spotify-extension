'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {
  var token = '';

  var spotifyApi = new SpotifyWebApi();
  var user;
  var allData;

  // Use the jQuery document ready signal to know when everything has been initialized
  $(document).ready(function () {
    // Tell Tableau we'd like to initialize our extension
    tableau.extensions.initializeAsync().then(function () {
      // Once the extension is initialized, ask the user to choose a sheet
      showChooseSheetDialog();
      initializeButtons();
    });
    // Initialize spotify web api with token
    spotifyApi.setAccessToken(token);

    spotifyApi.getMe([], function(err, data) {
      if (err) {
        console.error(err);
        alert("Error connecting to Spotify. Most likely due to an expired oauth token.");
      } else {
        user = data.id;
      }
    });

    $('#playlist-button').click(createNewPlaylist);
  });

  // Creates new Spotify playlist, and calls method to populate it with songs
  function createNewPlaylist() {
    // Grab the name of new playlist
    var playlistName = $('#playlist-name').val();

    // Make sure playlist name is not empty
    if (playlistName.length > 0) {
      var options = {
        'description': 'New playlist created in Tableau',
        'public': true,
        'name': playlistName
      };
      spotifyApi.createPlaylist(user, options, populatePlaylist);
    }
  }

  // Populates a newly created playlist with selected songs
  function populatePlaylist(err, data) {
    if (err) {
      console.error(err);
      alert("Error connecting to Spotify. Most likely due to an expired oauth token.");
    } else {
      // Get id of new playlist
      var id = data.id;

      // Find column index of track id
      var trackIdIndex = findTrackIdIndex();
      if (trackIdIndex == -1) {
        alert("Track Id not found in table!");
      } else {
        // Spotify only allows us to populate 100 songs per request, so we need to break it into chunks
        for (var i = 0; i < allData.data.length; i += 100) {
          var dataChunk = allData.data.slice(i, i + 100);
          var tracks = [];

          // Grab each track id and format it into Spotify track format
          for (var j = 0; j < dataChunk.length; j++) {
            tracks.push('spotify:track:' + dataChunk[j][trackIdIndex].value);
          }

          spotifyApi.addTracksToPlaylist(user, id, tracks, [], function(err, data) {
            if (err) {
              console.error(err);
              alert("Error connecting to Spotify. Most likely due to an expired oauth token.");
            } else {
              console.log(data);
            }
          });
        }
        alert('New playlist created!');
      }
    }
  }

  // Helper function to find track id column from selected data
  function findTrackIdIndex() {
    for (var i = 0; i < allData.columns.length; i++) {
      if (allData.columns[i].fieldName.match(/track id/i)) {
        return i;
      }
    }
    return -1;
  }

  function showChooseSheetDialog () {
    // Clear out the existing list of sheets
    $('#choose_sheet_buttons').empty();

    // Set the dashboard's name in the title
    const dashboardName = tableau.extensions.dashboardContent.dashboard.name;
    $('#choose_sheet_title').text(dashboardName);

    // The first step in choosing a sheet will be asking Tableau what sheets are available
    const worksheets = tableau.extensions.dashboardContent.dashboard.worksheets;

    // Next, we loop through all of these worksheets and add buttons for each one
    worksheets.forEach(function (worksheet) {
      // Declare our new button which contains the sheet name
      const button = createButton(worksheet.name);

      // Create an event handler for when this button is clicked
      button.click(function () {
        // Get the worksheet name which was selected
        const worksheetName = worksheet.name;

        // Close the dialog and show the data table for this worksheet
        $('#choose_sheet_dialog').modal('toggle');
        loadSelectedMarks(worksheetName);
      });

      // Add our button to the list of worksheets to choose from
      $('#choose_sheet_buttons').append(button);
    });

    // Show the dialog
    $('#choose_sheet_dialog').modal('toggle');
  }

  function createButton (buttonTitle) {
    const button =
    $(`<button type='button' class='btn btn-default btn-block'>
      ${buttonTitle}
    </button>`);

    return button;
  }

  // This variable will save off the function we can call to unregister listening to marks-selected events
  let unregisterEventHandlerFunction;

  function loadSelectedMarks (worksheetName) {
    // Remove any existing event listeners
    if (unregisterEventHandlerFunction) {
      unregisterEventHandlerFunction();
    }

    // Get the worksheet object we want to get the selected marks for
    const worksheet = getSelectedSheet(worksheetName);

    // Set our title to an appropriate value
    $('#selected_marks_title').text(worksheet.name);

    // Call to get the selected marks for our sheet
    worksheet.getSelectedMarksAsync().then(function (marks) {
      // Get the first DataTable for our selected marks (usually there is just one)
      const worksheetData = marks.data[0];

      // Map our data into the format which the data table component expects it
      const data = worksheetData.data.map(function (row, index) {
        const rowData = row.map(function (cell) {
          return cell.formattedValue;
        });

        return rowData;
      });

      // SPOTIFY: Store all data to be able to grab later
      allData = worksheetData;

      const columns = worksheetData.columns.map(function (column) {
        return { title: column.fieldName };
      });

      // Populate the data table with the rows and columns we just pulled out
      populateDataTable(data, columns);
    });

    // Add an event listener for the selection changed event on this sheet.
    unregisterEventHandlerFunction = worksheet.addEventListener(tableau.TableauEventType.MarkSelectionChanged, function (selectionEvent) {
      // When the selection changes, reload the data
      loadSelectedMarks(worksheetName);
    });
  }

  function populateDataTable (data, columns) {
    // Do some UI setup here to change the visible section and reinitialize the table
    $('#data_table_wrapper').empty();

    if (data.length > 0) {
      $('#no_data_message').css('display', 'none');
      $('#data_table_wrapper').append(`<table id='data_table' class='table table-striped table-bordered'></table>`);

      // Do some math to compute the height we want the data table to be
      var top = $('#data_table_wrapper')[0].getBoundingClientRect().top;
      var height = $(document).height() - top - 130;

      // Initialize our data table with what we just gathered
      $('#data_table').DataTable({
        data: data,
        columns: columns,
        autoWidth: false,
        deferRender: true,
        scroller: true,
        scrollY: height,
        scrollX: true,
        dom: "<'row'<'col-sm-6'i><'col-sm-6'f>><'row'<'col-sm-12'tr>>" // Do some custom styling
      });
    } else {
      // If we didn't get any rows back, there must be no marks selected
      $('#no_data_message').css('display', 'inline');
    }
  }

  function initializeButtons () {
    $('#show_choose_sheet_button').click(showChooseSheetDialog);
  }

  function getSelectedSheet (worksheetName) {
    // Go through all the worksheets in the dashboard and find the one we want
    return tableau.extensions.dashboardContent.dashboard.worksheets.find(function (sheet) {
      return sheet.name === worksheetName;
    });
  }
})();
