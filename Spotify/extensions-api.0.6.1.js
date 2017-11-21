(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tableau"] = factory();
	else
		root["tableau"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	// Due to the way we configured webpack, we should be exporting things which will be under
	// a global variable called "tableau". Export everything we want to be visible under tableau
	// from this file.
	var ExtensionsImpl_1 = __webpack_require__(1);
	var Extensions_1 = __webpack_require__(74);
	var api_shared_1 = __webpack_require__(8);
	api_shared_1.VersionNumber.SetVersionNumber(("0.6.1"));
	var extensionImpl = new ExtensionsImpl_1.ExtensionsImpl();
	exports.extensions = new Extensions_1.Extensions(extensionImpl);
	// Export Enums
	// These show up under the tableau object. I.e. tableau.ExtensionContext.Server
	var api_external_contract_1 = __webpack_require__(62);
	exports.ExtensionContext = api_external_contract_1.ExtensionContext;
	exports.ExtensionMode = api_external_contract_1.ExtensionMode;
	exports.AnalyticsObjectType = api_external_contract_1.AnalyticsObjectType;
	exports.ColumnType = api_external_contract_1.ColumnType;
	exports.DashboardObjectType = api_external_contract_1.DashboardObjectType;
	exports.DataType = api_external_contract_1.DataType;
	exports.DateRangeType = api_external_contract_1.DateRangeType;
	exports.DialogEventType = api_external_contract_1.DialogEventType;
	exports.EncodingType = api_external_contract_1.EncodingType;
	exports.ErrorCodes = api_external_contract_1.ErrorCodes;
	exports.FieldAggregationType = api_external_contract_1.FieldAggregationType;
	exports.FieldRoleType = api_external_contract_1.FieldRoleType;
	exports.FilterDomainType = api_external_contract_1.FilterDomainType;
	exports.FilterType = api_external_contract_1.FilterType;
	exports.FilterUpdateType = api_external_contract_1.FilterUpdateType;
	exports.FilterNullOption = api_external_contract_1.FilterNullOption;
	exports.MarkType = api_external_contract_1.MarkType;
	exports.ParameterValueType = api_external_contract_1.ParameterValueType;
	exports.PeriodType = api_external_contract_1.PeriodType;
	exports.QuickTableCalcType = api_external_contract_1.QuickTableCalcType;
	exports.SelectionUpdateType = api_external_contract_1.SelectionUpdateType;
	exports.SheetType = api_external_contract_1.SheetType;
	exports.SortDirection = api_external_contract_1.SortDirection;
	exports.TableauEventType = api_external_contract_1.TableauEventType;
	exports.TrendLineModelType = api_external_contract_1.TrendLineModelType;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_internal_contract_1 = __webpack_require__(2);
	var api_shared_1 = __webpack_require__(8);
	var api_utils_1 = __webpack_require__(52);
	var Dashboard_1 = __webpack_require__(53);
	var DashboardContent_1 = __webpack_require__(55);
	var Environment_1 = __webpack_require__(56);
	var Settings_1 = __webpack_require__(57);
	var RegisterAllExtensionsServices_1 = __webpack_require__(58);
	var DashboardImpl_1 = __webpack_require__(61);
	var SettingsImpl_1 = __webpack_require__(73);
	var ExtensionsImpl = (function () {
	    function ExtensionsImpl() {
	    }
	    ExtensionsImpl.prototype.initializeAsync = function () {
	        var _this = this;
	        if (!this._initializationPromise) {
	            this._initializationPromise = new Promise(function (resolve, reject) {
	                // First thing we want to do is check to see if there is a desktop dispatcher already registered for us
	                if (api_internal_contract_1.InternalApiDispatcherHolder.hasDesktopApiDispatcherPromise()) {
	                    // Running in desktop, use this promise
	                    var desktopDispatcherPromise = api_internal_contract_1.InternalApiDispatcherHolder.getDesktopDispatcherPromise();
	                    desktopDispatcherPromise.then(_this.onDispatcherReceived.bind(_this)).then(function () { resolve(); });
	                }
	                else {
	                    // We must be running in server, so we should try to kick of the server dispatcher bootstrapping
	                    api_shared_1.doCrossFrameBootstrap(window, api_shared_1.VersionNumber.Instance).then(_this.onDispatcherReceived.bind(_this)).then(function () { resolve(); });
	                }
	            });
	        }
	        return this._initializationPromise;
	    };
	    ExtensionsImpl.prototype.onDispatcherReceived = function (dispatcher) {
	        var _this = this;
	        dispatcher.setVersionNumber(api_shared_1.VersionNumber.Instance);
	        // Call to register all the services which will use the newly initialized dispatcher
	        api_shared_1.registerAllSharedServices(dispatcher);
	        RegisterAllExtensionsServices_1.registerAllExtensionsServices(dispatcher);
	        // Get the initialization service and initialize this extension
	        var initializationService = api_shared_1.ApiServiceRegistry.instance.getService("InitializationService" /* InitializationService */);
	        return initializationService.initializeDashboardExtensionsAsync().then(function (result) {
	            if (!result.extensionInstance.locator.dashboardPath) {
	                throw api_utils_1.TableauException.isUndefined(['DashboardPath']);
	            }
	            _this.dashboardContent = _this.initializeDashboardContent(result.extensionDashboardInfo, result.extensionInstance.locator.dashboardPath);
	            _this.environment = new Environment_1.Environment(result.extensionEnvironment);
	            _this.settings = _this.initializeSettings(result.extensionSettingsInfo);
	        });
	    };
	    ExtensionsImpl.prototype.initializeDashboardContent = function (info, sheetPath) {
	        var dashboardImpl = new DashboardImpl_1.DashboardImpl(info, sheetPath);
	        var dashboard = new Dashboard_1.Dashboard(dashboardImpl);
	        return new DashboardContent_1.DashboardContent(dashboard);
	    };
	    ExtensionsImpl.prototype.initializeSettings = function (settingsInfo) {
	        var settingsImpl = new SettingsImpl_1.SettingsImpl(settingsInfo);
	        return new Settings_1.Settings(settingsImpl);
	    };
	    return ExtensionsImpl;
	}());
	exports.ExtensionsImpl = ExtensionsImpl;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(3));
	__export(__webpack_require__(4));
	__export(__webpack_require__(5));
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ExtensionContext;
	(function (ExtensionContext) {
	    ExtensionContext["Desktop"] = "desktop";
	    ExtensionContext["Server"] = "server";
	    ExtensionContext["Unknown"] = "unknown";
	})(ExtensionContext = exports.ExtensionContext || (exports.ExtensionContext = {}));
	var ExtensionMode;
	(function (ExtensionMode) {
	    ExtensionMode["Authoring"] = "authoring";
	    ExtensionMode["Viewing"] = "viewing";
	    ExtensionMode["Unknown"] = "unknown";
	})(ExtensionMode = exports.ExtensionMode || (exports.ExtensionMode = {}));
	var ColumnType;
	(function (ColumnType) {
	    ColumnType["Discrete"] = "discrete";
	    ColumnType["Continuous"] = "continuous";
	})(ColumnType = exports.ColumnType || (exports.ColumnType = {}));
	var DashboardObjectType;
	(function (DashboardObjectType) {
	    DashboardObjectType["Blank"] = "blank";
	    DashboardObjectType["Worksheet"] = "worksheet";
	    DashboardObjectType["QuickFilter"] = "quick-filter";
	    DashboardObjectType["ParameterControl"] = "parameter-control";
	    DashboardObjectType["PageFilter"] = "page-filter";
	    DashboardObjectType["Legend"] = "legend";
	    DashboardObjectType["Title"] = "title";
	    DashboardObjectType["Text"] = "text";
	    DashboardObjectType["Image"] = "image";
	    DashboardObjectType["WebPage"] = "web-page";
	    DashboardObjectType["Extension"] = "extension";
	})(DashboardObjectType = exports.DashboardObjectType || (exports.DashboardObjectType = {}));
	var DataType;
	(function (DataType) {
	    DataType["String"] = "string";
	    DataType["Int"] = "int";
	    DataType["Float"] = "float";
	    DataType["Bool"] = "bool";
	    DataType["Date"] = "date";
	    DataType["DateTime"] = "date-time";
	    DataType["Spatial"] = "spatial";
	})(DataType = exports.DataType || (exports.DataType = {}));
	var EncodedDataType;
	(function (EncodedDataType) {
	    EncodedDataType["Number"] = "number";
	    EncodedDataType["String"] = "string";
	    EncodedDataType["Date"] = "date";
	    EncodedDataType["Boolean"] = "boolean";
	})(EncodedDataType = exports.EncodedDataType || (exports.EncodedDataType = {}));
	var ErrorCode;
	(function (ErrorCode) {
	    ErrorCode["ServerError"] = "server-error";
	    ErrorCode["InvalidAggregationFieldName"] = "invalid-aggregation-field-name";
	    ErrorCode["InvalidFilterFieldName"] = "invalid-filter-fieldname";
	    ErrorCode["InvalidFilterFieldValue"] = "invalid-filter-field-value";
	})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
	var FieldAggregationType;
	(function (FieldAggregationType) {
	    FieldAggregationType["Sum"] = "sum";
	    FieldAggregationType["Avg"] = "avg";
	    FieldAggregationType["Min"] = "min";
	    FieldAggregationType["Max"] = "max";
	    FieldAggregationType["Stdev"] = "stdev";
	    FieldAggregationType["Stdevp"] = "stdevp";
	    FieldAggregationType["Var"] = "var";
	    FieldAggregationType["Varp"] = "varp";
	    FieldAggregationType["Count"] = "count";
	    FieldAggregationType["Countd"] = "countd";
	    FieldAggregationType["Median"] = "median";
	    FieldAggregationType["Attr"] = "attr";
	    FieldAggregationType["None"] = "none";
	    FieldAggregationType["Year"] = "year";
	    FieldAggregationType["Qtr"] = "qtr";
	    FieldAggregationType["Month"] = "month";
	    FieldAggregationType["Day"] = "day";
	    FieldAggregationType["Hour"] = "hour";
	    FieldAggregationType["Minute"] = "minute";
	    FieldAggregationType["Second"] = "second";
	    FieldAggregationType["Week"] = "week";
	    FieldAggregationType["Weekday"] = "weekday";
	    FieldAggregationType["MonthYear"] = "month-year";
	    FieldAggregationType["Mdy"] = "mdy";
	    FieldAggregationType["End"] = "end";
	    FieldAggregationType["TruncYear"] = "trunc-year";
	    FieldAggregationType["TruncQtr"] = "trunc-qtr";
	    FieldAggregationType["TruncMonth"] = "trunc-month";
	    FieldAggregationType["TruncWeek"] = "trunc-week";
	    FieldAggregationType["TruncDay"] = "trunc-day";
	    FieldAggregationType["TruncHour"] = "trunc-hour";
	    FieldAggregationType["TruncMinute"] = "trunc-minute";
	    FieldAggregationType["TruncSecond"] = "trunc-second";
	    FieldAggregationType["Quart1"] = "quart1";
	    FieldAggregationType["Quart3"] = "quart3";
	    FieldAggregationType["Skewness"] = "skewness";
	    FieldAggregationType["Kurtosis"] = "kurtosis";
	    FieldAggregationType["InOut"] = "in-out";
	    FieldAggregationType["User"] = "user";
	})(FieldAggregationType = exports.FieldAggregationType || (exports.FieldAggregationType = {}));
	var FieldRoleType;
	(function (FieldRoleType) {
	    FieldRoleType["Dimension"] = "dimension";
	    FieldRoleType["Measure"] = "measure";
	    FieldRoleType["Unknown"] = "unknown";
	})(FieldRoleType = exports.FieldRoleType || (exports.FieldRoleType = {}));
	/**
	 *  The different update types for applying filter.
	 */
	var FilterUpdateType;
	(function (FilterUpdateType) {
	    FilterUpdateType["Add"] = "add";
	    FilterUpdateType["All"] = "all";
	    FilterUpdateType["Replace"] = "replace";
	    FilterUpdateType["Remove"] = "remove";
	})(FilterUpdateType = exports.FilterUpdateType || (exports.FilterUpdateType = {}));
	var SheetType;
	(function (SheetType) {
	    SheetType["Dashboard"] = "dashboard";
	    SheetType["Story"] = "story";
	    SheetType["Worksheet"] = "worksheet";
	})(SheetType = exports.SheetType || (exports.SheetType = {}));
	var DomainRestrictionType;
	(function (DomainRestrictionType) {
	    DomainRestrictionType["All"] = "all";
	    DomainRestrictionType["List"] = "list";
	    DomainRestrictionType["Range"] = "range";
	})(DomainRestrictionType = exports.DomainRestrictionType || (exports.DomainRestrictionType = {}));
	var DateStepPeriod;
	(function (DateStepPeriod) {
	    DateStepPeriod["Years"] = "years";
	    DateStepPeriod["Quarters"] = "quarters";
	    DateStepPeriod["Months"] = "months";
	    DateStepPeriod["Weeks"] = "weeks";
	    DateStepPeriod["Days"] = "days";
	    DateStepPeriod["Hours"] = "hours";
	    DateStepPeriod["Minutes"] = "minutes";
	    DateStepPeriod["Seconds"] = "seconds";
	})(DateStepPeriod = exports.DateStepPeriod || (exports.DateStepPeriod = {}));
	/**
	 * The option for specifying which values to include for filtering.
	 */
	var FilterNullOption;
	(function (FilterNullOption) {
	    FilterNullOption["NullValues"] = "nullvalues";
	    FilterNullOption["NonNullValues"] = "nonnullvalues";
	    FilterNullOption["AllValues"] = "allvalues";
	})(FilterNullOption = exports.FilterNullOption || (exports.FilterNullOption = {}));
	/**
	 * The type of filter domain
	 */
	var FilterDomainType;
	(function (FilterDomainType) {
	    FilterDomainType["Relevant"] = "relevant";
	    FilterDomainType["Database"] = "database";
	})(FilterDomainType = exports.FilterDomainType || (exports.FilterDomainType = {}));
	/**
	 * Internal enum for specifying the selection type for select marks api.
	 */
	var SelectionUpdateType;
	(function (SelectionUpdateType) {
	    SelectionUpdateType["Replace"] = "select-replace";
	    SelectionUpdateType["Add"] = "select-add";
	    SelectionUpdateType["Remove"] = "select-remove";
	})(SelectionUpdateType = exports.SelectionUpdateType || (exports.SelectionUpdateType = {}));
	/**
	 * Internal enum for specifying the included values type for range selection.
	 */
	var QuantitativeIncludedValues;
	(function (QuantitativeIncludedValues) {
	    QuantitativeIncludedValues["IncludeNull"] = "include-null";
	    QuantitativeIncludedValues["IncludeNonNull"] = "include-non-null";
	    QuantitativeIncludedValues["IncludeAll"] = "include-all";
	})(QuantitativeIncludedValues = exports.QuantitativeIncludedValues || (exports.QuantitativeIncludedValues = {}));
	/**
	 * Type of mark for a given marks card in a viz.
	 */
	var MarkType;
	(function (MarkType) {
	    MarkType["Bar"] = "bar";
	    MarkType["Line"] = "line";
	    MarkType["Area"] = "area";
	    MarkType["Square"] = "square";
	    MarkType["Circle"] = "circle";
	    MarkType["Shape"] = "shape";
	    MarkType["Text"] = "text";
	    MarkType["Map"] = "map";
	    MarkType["Pie"] = "pie";
	    MarkType["GanttBar"] = "gantt-bar";
	    MarkType["Polygon"] = "polygon";
	})(MarkType = exports.MarkType || (exports.MarkType = {}));
	/**
	 * Internal enum for specifying the type of filter
	 */
	var FilterType;
	(function (FilterType) {
	    FilterType["Categorical"] = "categorical";
	    FilterType["Range"] = "range";
	    FilterType["RelativeDate"] = "relativeDate";
	    FilterType["Hierarchical"] = "hierarchical";
	})(FilterType = exports.FilterType || (exports.FilterType = {}));
	/**
	 * Internal enum for specifying the DateRangeType of a relative date filter
	 */
	var DateRangeType;
	(function (DateRangeType) {
	    /**
	     * Refers to the last day, week, month, etc. of the date period.
	     */
	    DateRangeType["Last"] = "last";
	    /**
	     * Refers to the last N days, weeks, months, etc. of the date period.
	     */
	    DateRangeType["LastN"] = "lastN";
	    /**
	     * Refers to the next day, week, month, etc. of the date period.
	     */
	    DateRangeType["Next"] = "next";
	    /**
	     * Refers to the next N days, weeks, months, etc. of the date period.
	     */
	    DateRangeType["NextN"] = "nextN";
	    /**
	     * Refers to the current day, week, month, etc. of the date period.
	     */
	    DateRangeType["Current"] = "current";
	    /**
	     * Refers to everything up to and including the current day, week, month, etc. of the date period.
	     */
	    DateRangeType["ToDate"] = "toDate";
	})(DateRangeType = exports.DateRangeType || (exports.DateRangeType = {}));


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var InternalApiDispatcherHolder;
	(function (InternalApiDispatcherHolder) {
	    function getDesktopDispatcherPromise() {
	        return window.__tableauDesktopDispatcher;
	    }
	    InternalApiDispatcherHolder.getDesktopDispatcherPromise = getDesktopDispatcherPromise;
	    function hasDesktopApiDispatcherPromise() {
	        return !!InternalApiDispatcherHolder.getDesktopDispatcherPromise();
	    }
	    InternalApiDispatcherHolder.hasDesktopApiDispatcherPromise = hasDesktopApiDispatcherPromise;
	    function setDesktopDispatcherPromise(dispatcher) {
	        window.__tableauDesktopDispatcher = dispatcher;
	    }
	    InternalApiDispatcherHolder.setDesktopDispatcherPromise = setDesktopDispatcherPromise;
	})(InternalApiDispatcherHolder = exports.InternalApiDispatcherHolder || (exports.InternalApiDispatcherHolder = {}));


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var NotificationId;
	(function (NotificationId) {
	    NotificationId["SelectedMarksChanged"] = "selected-marks-changed";
	    NotificationId["ParameterChanged"] = "parameter-changed";
	    NotificationId["FilterChanged"] = "filter-changed";
	})(NotificationId = exports.NotificationId || (exports.NotificationId = {}));


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ParameterId;
	(function (ParameterId) {
	    ParameterId["ExtensionLocator"] = "extension-locator";
	    ParameterId["ExtensionBootstrapInfo"] = "extension-bootstrap-info";
	    ParameterId["ExtensionSettingsInfo"] = "extension-settings-info";
	    ParameterId["VisualId"] = "visual-id";
	    ParameterId["SheetPath"] = "sheet-path";
	    ParameterId["IgnoreAliases"] = "ignore-aliases";
	    ParameterId["IgnoreSelection"] = "ignore-selection";
	    ParameterId["IncludeAllColumns"] = "include-all-columns";
	    ParameterId["MaxRows"] = "max-rows";
	    ParameterId["UnderlyingDataTable"] = "underlying-data-table";
	    ParameterId["UnderlyingSummaryDataTable"] = "underlying-summary-data-table";
	    ParameterId["DataSourceDataTable"] = "data-source-data-table";
	    ParameterId["SettingsValues"] = "settings-values";
	    ParameterId["SelectedData"] = "selected-data";
	    ParameterId["HighlightedData"] = "highlighted-data";
	    // Filter Params
	    ParameterId["FieldName"] = "field-name";
	    ParameterId["FilterValues"] = "filter-values";
	    ParameterId["FilterUpdateType"] = "filter-update-type";
	    ParameterId["IsExcludeMode"] = "is-exclude";
	    ParameterId["FilterRangeMin"] = "filter-range-min";
	    ParameterId["FilterRangeMax"] = "filter-range-max";
	    ParameterId["FilterRangeNullOption"] = "filter-range-null-option";
	    ParameterId["WorksheetFilters"] = "worksheet-filters";
	    ParameterId["FieldId"] = "field-id";
	    ParameterId["DomainType"] = "domain-type";
	    ParameterId["CategoricalDomain"] = "categorical-domain";
	    ParameterId["QuantitativeDomain"] = "quantitative-dmain";
	    ParameterId["WorksheetName"] = "worksheet-name";
	    ParameterId["DashboardName"] = "dashboard";
	    ParameterId["ParameterInfo"] = "parameter-info";
	    ParameterId["ParameterInfos"] = "parameter-infos";
	    ParameterId["ParameterCaption"] = "paremeter-caption";
	    ParameterId["ParameterFieldName"] = "parameter-field-name";
	    ParameterId["ParameterValue"] = "parameter-value";
	    ParameterId["Selection"] = "selection";
	    ParameterId["SelectionUpdateType"] = "selectionUpdateType";
	    ParameterId["HierValSelectionModels"] = "hierarchicalValueSelectionModels";
	    ParameterId["QuantRangeSelectionModels"] = "quantativeRangeSelectionModels";
	    ParameterId["DimValSelectionModels"] = "dimensionValueSelectionModels";
	    ParameterId["DataSourceId"] = "data-source-id";
	    ParameterId["DataSchema"] = "data-schema";
	    ParameterId["DataSourceName"] = "data-source-name";
	    ParameterId["ColumnsToInclude"] = "columns-to-include";
	    ParameterId["JoinDescription"] = "join-description";
	})(ParameterId = exports.ParameterId || (exports.ParameterId = {}));


/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	// Declare this key type and export the NotificationId to make this behave like a string enum
	var VerbId;
	(function (VerbId) {
	    VerbId["ApplyCategoricalFilter"] = "categorical-filter";
	    VerbId["ApplyRangeFilter"] = "range-filter";
	    VerbId["ClearFilter"] = "clear-filter";
	    VerbId["InitializeExtension"] = "initialize-extension";
	    VerbId["GetDataSummaryData"] = "get-summary-data";
	    VerbId["GetUnderlyingData"] = "get-underlying-data";
	    VerbId["GetDataSourceData"] = "get-datasource-data";
	    VerbId["SaveExtensionSettings"] = "save-extension-settings";
	    VerbId["GetSelectedMarks"] = "get-selected-marks";
	    VerbId["GetHighlightedMarks"] = "get-highlighted-marks";
	    VerbId["GetParametersForSheet"] = "get-parameters-for-sheet";
	    VerbId["FindParameter"] = "find-parameter";
	    VerbId["ChangeParameterValue"] = "change-parameter-value";
	    VerbId["ClearSelectedMarks"] = "clear-selected-marks";
	    VerbId["SelectByValue"] = "select-by-value";
	    VerbId["GetDataSources"] = "get-data-sources";
	    VerbId["RefreshDataSource"] = "refresh-data-source";
	    VerbId["GetFilters"] = "get-filters";
	    VerbId["GetCategoricalDomain"] = "get-categorical-domain";
	    VerbId["GetRangeDomain"] = "get-range-domain";
	    VerbId["GetJoinDescription"] = "get-join-description";
	})(VerbId = exports.VerbId || (exports.VerbId = {}));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(9));
	__export(__webpack_require__(14));
	var Point_1 = __webpack_require__(15);
	exports.Point = Point_1.Point;
	var Size_1 = __webpack_require__(16);
	exports.Size = Size_1.Size;
	__export(__webpack_require__(17));
	__export(__webpack_require__(18));
	__export(__webpack_require__(19));
	__export(__webpack_require__(25));
	__export(__webpack_require__(24));
	__export(__webpack_require__(23));
	__export(__webpack_require__(22));
	__export(__webpack_require__(26));
	__export(__webpack_require__(27));
	__export(__webpack_require__(28));
	__export(__webpack_require__(35));
	__export(__webpack_require__(33));
	__export(__webpack_require__(43));
	__export(__webpack_require__(51));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_utils_1 = __webpack_require__(10);
	/**
	 * Class designed to register and unregister handlers from a user. Only those events
	 * which are added via AddNewEventType will be supported by this instance
	 */
	var EventListenerManager = (function () {
	    function EventListenerManager() {
	        this._eventListenerManagers = {};
	    }
	    EventListenerManager.prototype.addEventListener = function (eventType, handler) {
	        if (!this._eventListenerManagers.hasOwnProperty(eventType)) {
	            throw api_utils_1.TableauException.error(EventListenerManager.UNSUPPORTED_EVENT, [eventType]);
	        }
	        return this._eventListenerManagers[eventType].addEventListener(handler);
	    };
	    EventListenerManager.prototype.removeEventListener = function (eventType, handler) {
	        if (!this._eventListenerManagers.hasOwnProperty(eventType)) {
	            throw api_utils_1.TableauException.error(EventListenerManager.UNSUPPORTED_EVENT, [eventType]);
	        }
	        return this._eventListenerManagers[eventType].removeEventListener(handler);
	    };
	    EventListenerManager.prototype.addNewEventType = function (eventManager) {
	        this._eventListenerManagers[eventManager.eventType] = eventManager;
	    };
	    EventListenerManager.UNSUPPORTED_EVENT = 'Unsupported event type : %1';
	    return EventListenerManager;
	}());
	exports.EventListenerManager = EventListenerManager;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	var EnumConverter_1 = __webpack_require__(11);
	exports.EnumConverter = EnumConverter_1.EnumConverter;
	var Param_1 = __webpack_require__(13);
	exports.Param = Param_1.Param;
	var TableauException_1 = __webpack_require__(12);
	exports.TableauException = TableauException_1.TableauException;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauException_1 = __webpack_require__(12);
	/**
	 * This class converts from a source enum value to destination enum
	 * value given a mapping from source to destination when constructed.
	 */
	var EnumConverter = (function () {
	    function EnumConverter(_mappings, _defaultVal) {
	        this._mappings = _mappings;
	        this._defaultVal = _defaultVal;
	    }
	    EnumConverter.prototype.convert = function (enumVal, throwIfMissing) {
	        if (this._mappings.hasOwnProperty(enumVal)) {
	            return this._mappings[enumVal];
	        }
	        if (this._defaultVal !== undefined && !throwIfMissing) {
	            return this._defaultVal;
	        }
	        throw TableauException_1.TableauException.error(EnumConverter.MAPPING_NOT_FOUND, [enumVal]);
	    };
	    EnumConverter.MAPPING_NOT_FOUND = 'Mapping not found for %1';
	    return EnumConverter;
	}());
	exports.EnumConverter = EnumConverter;


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauException = (function () {
	    function TableauException() {
	    }
	    TableauException.apiNotImplemented = function (params) {
	        var message = TableauException.format(TableauException.API_NOT_IMPLEMENTED, params);
	        return new Error(message);
	    };
	    TableauException.isUndefined = function (params) {
	        var message = TableauException.format(TableauException.UNDEFINED, params);
	        return new Error(message);
	    };
	    TableauException.isNull = function (params) {
	        var message = TableauException.format(TableauException.IS_NULL, params);
	        return new Error(message);
	    };
	    TableauException.invalidParamValue = function (params) {
	        var message = TableauException.format(TableauException.INVALID_PARAMETER_VALUE, params);
	        return new Error(message);
	    };
	    TableauException.invalidParamType = function (params) {
	        var message = TableauException.format(TableauException.INVALID_PARAMETER_TYPE, params);
	        return new Error(message);
	    };
	    TableauException.missingParameter = function (params) {
	        var message = TableauException.format(TableauException.MISSING_PARAMETER, params);
	        return new Error(message);
	    };
	    TableauException.invalid = function (params) {
	        var message = TableauException.format(TableauException.INVALID, params);
	        return new Error(message);
	    };
	    TableauException.internalError = function (params) {
	        var message = TableauException.format(TableauException.INTERNAL_ERROR, params);
	        return new Error(message);
	    };
	    TableauException.error = function (message, params) {
	        var result;
	        if (params) {
	            result = TableauException.format(message, params);
	        }
	        else {
	            result = message;
	        }
	        return new Error(result);
	    };
	    TableauException.format = function (message, params) {
	        for (var i = 0; i < params.length; i++) {
	            var match = '%' + (i + 1);
	            message = message.replace(new RegExp(match, 'g'), params[i]);
	        }
	        message = message.replace(new RegExp('%[0-9]+', 'g'), '');
	        message = message.trim();
	        return message;
	    };
	    TableauException.API_NOT_IMPLEMENTED = '%1 API not yet implemented.';
	    TableauException.UNDEFINED = '%1 is undefined.';
	    TableauException.INVALID_PARAMETER_VALUE = 'Invalid value for parameter: %1. %2';
	    TableauException.INVALID_PARAMETER_TYPE = 'Invalid type for parameter: %1. %2';
	    TableauException.MISSING_PARAMETER = 'Missing Parameter: %1.';
	    TableauException.UNKNOWN_ERROR = 'Unknown error.';
	    TableauException.INTERNAL_ERROR = 'Internal error: %1.';
	    TableauException.INVALID = 'Invalid: %1. %2';
	    TableauException.IS_NULL = '%1 is null.';
	    return TableauException;
	}());
	exports.TableauException = TableauException;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauException_1 = __webpack_require__(12);
	var Param = (function () {
	    function Param() {
	    }
	    /**
	     * Verifies that an incoming parameter is 'truthy' and throws
	     * an error if it's not. This will throw an error if the value
	     * is null, undefined, NaN, the empty string, 0, or false.
	     *
	     * @param argumentValue value to verify
	     * @param argumentName name of argument to verify
	     */
	    /*tslint:disable-next-line */
	    Param.verifyValue = function (argumentValue, argumentName) {
	        if (!argumentValue) {
	            throw TableauException_1.TableauException.invalidParamValue([argumentName]);
	        }
	    };
	    /**
	     * Verifies that a string is valid.  Throws an error if the string is
	     * null, undefined, or NaN.
	     *
	     * @param argumentValue value to verify
	     * @param argumentName name of argument to verify
	     */
	    Param.verifyString = function (argumentValue, argumentName) {
	        if (argumentValue === null || argumentValue === undefined) {
	            throw TableauException_1.TableauException.invalidParamValue([argumentName]);
	        }
	    };
	    /**
	     * Verifies the value is part of the Enum
	     *
	     * String enums are {string : string} dictionaries which are not reverse mappable
	     * This is an ugly workaround
	     * @param value value to verify
	     * @param enumType enum to verify against
	     */
	    /* tslint:disable:no-any */
	    Param.isValidEnumValue = function (value, enumType) {
	        var isValid = false;
	        Object.keys(enumType).forEach(function (enumKey) {
	            if (enumType[enumKey] === value.toString()) {
	                isValid = true;
	            }
	        });
	        return isValid;
	    };
	    /* tslint:enable:no-any */
	    /**
	     * serializes the date into the format that the server expects.
	     * @param date the date to serialize
	     */
	    Param.serializeDateForPlatform = function (date) {
	        var year = date.getUTCFullYear();
	        var month = date.getUTCMonth() + 1;
	        var day = date.getUTCDate();
	        var hh = date.getUTCHours();
	        var mm = date.getUTCMinutes();
	        var sec = date.getUTCSeconds();
	        return year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + sec;
	    };
	    Param.serializeBooleanForPlatform = function (bool) {
	        return bool ? 'true' : 'false';
	    };
	    Param.serializeNumberForPlatform = function (num) {
	        return num.toString(10);
	    };
	    /**
	     * Verifies the params min and max for applying range filter
	     * @param min range min
	     * @param max range max
	     */
	    /* tslint:disable:no-any */
	    Param.verifyRangeParamType = function (min, max) {
	        /* tslint:enable:no-any */
	        if (!min && !max) {
	            throw TableauException_1.TableauException.invalidParamValue(['Range parameters', 'At least one of min or max is required.']);
	        }
	        if (!Param.isTypeNumber(min) && !Param.isTypeDate(min)) {
	            throw TableauException_1.TableauException.invalidParamType(['Range parameters', 'Only Date and number are allowed for parameter min.']);
	        }
	        if (!Param.isTypeNumber(max) && !Param.isTypeDate(max)) {
	            throw TableauException_1.TableauException.invalidParamType(['Range parameters', 'Only Date and number are allowed for parameter max.']);
	        }
	        if (typeof (min) !== typeof (max)) {
	            throw TableauException_1.TableauException.invalidParamType(['Range parameters', 'Parameters min and max should be of the same type.']);
	        }
	    };
	    /**
	     * Verifies the input is a number
	     */
	    /* tslint:disable:no-any */
	    Param.isTypeNumber = function (input) {
	        return typeof (input) === 'number' || input instanceof Number;
	    };
	    /* tslint:enable:no-any */
	    /**
	     * Verifies the input is a Date
	     */
	    /* tslint:disable:no-any */
	    Param.isTypeDate = function (input) {
	        return input instanceof Date;
	    };
	    /* tslint:enable:no-any */
	    /* tslint:disable-next-line:no-any */
	    Param.isTypeString = function (input) {
	        return typeof (input) === 'string' || input instanceof String;
	    };
	    /* tslint:disable-next-line:no-any */
	    Param.isTypeBool = function (input) {
	        return typeof (input) === 'boolean' || input instanceof Boolean;
	    };
	    /* tslint:disable-next-line:no-any */
	    Param.serializeParamterValue = function (value) {
	        if (Param.isTypeNumber(value)) {
	            return Param.serializeNumberForPlatform(value);
	        }
	        else if (Param.isTypeDate(value)) {
	            return Param.serializeDateForPlatform(value);
	        }
	        else if (Param.isTypeBool(value)) {
	            return Param.serializeBooleanForPlatform(value);
	        }
	        else if (Param.isTypeString(value)) {
	            return value;
	        }
	        else {
	            throw TableauException_1.TableauException.invalidParamValue(['value']);
	        }
	    };
	    return Param;
	}());
	exports.Param = Param;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var EventListenerManager_1 = __webpack_require__(9);
	/**
	 * Implementation of the Parameter contract. Calls down to the impl
	 * class for almost all of the work it does.
	 */
	var Parameter = (function (_super) {
	    __extends(Parameter, _super);
	    function Parameter(parameterImpl, sheet) {
	        var _this = _super.call(this) || this;
	        _this.parameterImpl = parameterImpl;
	        // Initialize our event handling for this class
	        _this.parameterImpl.initializeEvents(sheet).forEach(function (e) { return _this.addNewEventType(e); });
	        return _this;
	    }
	    Object.defineProperty(Parameter.prototype, "name", {
	        get: function () {
	            return this.parameterImpl.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Parameter.prototype, "currentValue", {
	        get: function () {
	            return this.parameterImpl.currentValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Parameter.prototype, "dataType", {
	        get: function () {
	            return this.parameterImpl.dataType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Parameter.prototype, "allowableValues", {
	        get: function () {
	            return this.parameterImpl.allowableValues;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Parameter.prototype, "id", {
	        get: function () {
	            return this.parameterImpl.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Parameter.prototype.changeValueAsync = function (newValue) {
	        return this.parameterImpl.changeValueAsync(newValue);
	    };
	    return Parameter;
	}(EventListenerManager_1.EventListenerManager));
	exports.Parameter = Parameter;


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Point = (function () {
	    function Point(_x, _y) {
	        this._x = _x;
	        this._y = _y;
	    }
	    Object.defineProperty(Point.prototype, "x", {
	        get: function () {
	            return this._x;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Point.prototype, "y", {
	        get: function () {
	            return this._y;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Point;
	}());
	exports.Point = Point;


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Size = (function () {
	    function Size(_height, _width) {
	        this._height = _height;
	        this._width = _width;
	    }
	    Object.defineProperty(Size.prototype, "height", {
	        get: function () {
	            return this._height;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Size.prototype, "width", {
	        get: function () {
	            return this._width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Size;
	}());
	exports.Size = Size;


/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var DataTable = (function () {
	    function DataTable(_data, _columns, _totalRowCount, _isSummaryData, _marksInfo) {
	        this._data = _data;
	        this._columns = _columns;
	        this._totalRowCount = _totalRowCount;
	        this._isSummaryData = _isSummaryData;
	        this._marksInfo = _marksInfo;
	        // TODO: get rid of this in redesign.
	        this._name = _isSummaryData ? 'Summary Data Table' : 'Underlying Data Table';
	    }
	    Object.defineProperty(DataTable.prototype, "name", {
	        get: function () {
	            return this._name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataTable.prototype, "data", {
	        get: function () {
	            return this._data;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataTable.prototype, "columns", {
	        get: function () {
	            return this._columns;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataTable.prototype, "marksInfo", {
	        get: function () {
	            return this._marksInfo;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataTable.prototype, "totalRowCount", {
	        get: function () {
	            return this._totalRowCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataTable.prototype, "isSummaryData", {
	        get: function () {
	            return this._isSummaryData;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return DataTable;
	}());
	exports.DataTable = DataTable;
	var MarkInfo = (function () {
	    function MarkInfo(_type, _color, _tupleId) {
	        this._type = _type;
	        this._color = _color;
	        this._tupleId = _tupleId;
	    }
	    Object.defineProperty(MarkInfo.prototype, "type", {
	        get: function () {
	            return this._type;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MarkInfo.prototype, "color", {
	        get: function () {
	            return this._color;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MarkInfo.prototype, "tupleId", {
	        get: function () {
	            return this._tupleId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MarkInfo;
	}());
	exports.MarkInfo = MarkInfo;
	var Column = (function () {
	    function Column(_fieldName, _dataType, // TODO: this shoudl be an enum type
	        _isReferenced, _index) {
	        this._fieldName = _fieldName;
	        this._dataType = _dataType;
	        this._isReferenced = _isReferenced;
	        this._index = _index;
	    }
	    Object.defineProperty(Column.prototype, "fieldName", {
	        get: function () {
	            return this._fieldName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Column.prototype, "dataType", {
	        get: function () {
	            return this._dataType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Column.prototype, "isReferenced", {
	        get: function () {
	            return this._isReferenced;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Column.prototype, "index", {
	        get: function () {
	            return this._index;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Column;
	}());
	exports.Column = Column;
	var DataValue = (function () {
	    /* tslint:disable:no-any */
	    function DataValue(_value, _formattedValue) {
	        this._value = _value;
	        this._formattedValue = _formattedValue;
	    }
	    Object.defineProperty(DataValue.prototype, "value", {
	        get: function () {
	            return this._value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataValue.prototype, "formattedValue", {
	        get: function () {
	            return this._formattedValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return DataValue;
	}());
	exports.DataValue = DataValue;


/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauExceptions = (function () {
	    function TableauExceptions() {
	    }
	    return TableauExceptions;
	}());
	exports.TableauExceptions = TableauExceptions;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var api_utils_1 = __webpack_require__(10);
	var TableauWorksheetEvent_1 = __webpack_require__(22);
	var FilterChangedEvent = (function (_super) {
	    __extends(FilterChangedEvent, _super);
	    function FilterChangedEvent(worksheet, _fieldName) {
	        var _this = _super.call(this, Contract.TableauEventType.FilterChanged, worksheet) || this;
	        _this._fieldName = _fieldName;
	        return _this;
	    }
	    Object.defineProperty(FilterChangedEvent.prototype, "fieldName", {
	        get: function () {
	            return this._fieldName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FilterChangedEvent.prototype.getFilterAsync = function () {
	        var _this = this;
	        return this._worksheet.getFiltersAsync().then(function (filters) {
	            // TODO: Filtering of the filters should eventually be done platform side.
	            var eventedFilter = filters.find(function (filter) { return (filter.fieldName === _this._fieldName); });
	            if (!eventedFilter) {
	                // We shouldn't hit this unless the filter was removed from the worksheet
	                // after the event was raised.
	                throw api_utils_1.TableauException.internalError(['Filter no longer found in worksheet.']);
	            }
	            return eventedFilter;
	        });
	    };
	    return FilterChangedEvent;
	}(TableauWorksheetEvent_1.TableauWorksheetEvent));
	exports.FilterChangedEvent = FilterChangedEvent;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(21));


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	// All enum values made available to Extensions developers.
	// Enums should be kept in alphabetical order.
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * The context in which the Extensions is currently running.
	 */
	var ExtensionContext;
	(function (ExtensionContext) {
	    ExtensionContext["Desktop"] = "desktop";
	    ExtensionContext["Server"] = "server";
	})(ExtensionContext = exports.ExtensionContext || (exports.ExtensionContext = {}));
	/**
	 * The mode in which the Extensions is currently running.
	 */
	var ExtensionMode;
	(function (ExtensionMode) {
	    ExtensionMode["Authoring"] = "authoring";
	    ExtensionMode["Viewing"] = "viewing";
	})(ExtensionMode = exports.ExtensionMode || (exports.ExtensionMode = {}));
	var AnalyticsObjectType;
	(function (AnalyticsObjectType) {
	    AnalyticsObjectType["Cluster"] = "cluster";
	    AnalyticsObjectType["Forecast"] = "forecast";
	    AnalyticsObjectType["TrendLine"] = "trend-line";
	})(AnalyticsObjectType = exports.AnalyticsObjectType || (exports.AnalyticsObjectType = {}));
	var ColumnType;
	(function (ColumnType) {
	    ColumnType["Discrete"] = "discrete";
	    ColumnType["Continuous"] = "continuous";
	})(ColumnType = exports.ColumnType || (exports.ColumnType = {}));
	/**
	 * What the object represents in a dashboard.
	 */
	var DashboardObjectType;
	(function (DashboardObjectType) {
	    DashboardObjectType["Blank"] = "blank";
	    DashboardObjectType["Worksheet"] = "worksheet";
	    DashboardObjectType["QuickFilter"] = "quick-filter";
	    DashboardObjectType["ParameterControl"] = "parameter-control";
	    DashboardObjectType["PageFilter"] = "page-filter";
	    DashboardObjectType["Legend"] = "legend";
	    DashboardObjectType["Title"] = "title";
	    DashboardObjectType["Text"] = "text";
	    DashboardObjectType["Image"] = "image";
	    DashboardObjectType["WebPage"] = "web-page";
	    DashboardObjectType["Extension"] = "extension";
	})(DashboardObjectType = exports.DashboardObjectType || (exports.DashboardObjectType = {}));
	/**
	 * The different types of data a value can have
	 */
	var DataType;
	(function (DataType) {
	    DataType["String"] = "string";
	    DataType["Int"] = "int";
	    DataType["Float"] = "float";
	    DataType["Bool"] = "bool";
	    DataType["Date"] = "date";
	    DataType["DateTime"] = "date-time";
	    DataType["Spatial"] = "spatial";
	})(DataType = exports.DataType || (exports.DataType = {}));
	/**
	 * Valid date ranges for a relative date filter.
	 */
	var DateRangeType;
	(function (DateRangeType) {
	    DateRangeType["Last"] = "last";
	    DateRangeType["LastN"] = "last-n";
	    DateRangeType["Next"] = "next";
	    DateRangeType["NextN"] = "next-n";
	    DateRangeType["Current"] = "current";
	    DateRangeType["ToDate"] = "to-date";
	})(DateRangeType = exports.DateRangeType || (exports.DateRangeType = {}));
	/**
	 * Types of dialog event for event listening between a parent Extensions and a popup dialog.
	 */
	var DialogEventType;
	(function (DialogEventType) {
	    DialogEventType["DialogMessage"] = "dialog-message";
	    DialogEventType["DialogEvent"] = "dialog-event";
	})(DialogEventType = exports.DialogEventType || (exports.DialogEventType = {}));
	var EncodingType;
	(function (EncodingType) {
	    EncodingType["Column"] = "column";
	    EncodingType["Row"] = "row";
	    EncodingType["Page"] = "page";
	    EncodingType["Filter"] = "filter";
	    EncodingType["MarksType"] = "marks-type";
	    EncodingType["MeasureValues"] = "measure-values";
	    EncodingType["Color"] = "color";
	    EncodingType["Size"] = "size";
	    EncodingType["Label"] = "label";
	    EncodingType["Detail"] = "detail";
	    EncodingType["Tooltip"] = "tooltip";
	    EncodingType["Shape"] = "shape";
	    EncodingType["Path"] = "path";
	    EncodingType["Angle"] = "angle";
	})(EncodingType = exports.EncodingType || (exports.EncodingType = {}));
	/**
	 * All error codes used by the Extensions API.
	 */
	var ErrorCodes;
	(function (ErrorCodes) {
	    /**
	     * Only one dialog can be opened at time with the UI namespace functionality.
	     */
	    ErrorCodes["DialogAlreadyOpen"] = "dialog-already-open";
	    /**
	     * The open dialog was closed by the user.
	     */
	    ErrorCodes["DialogClosedByUser"] = "dialog-closed-by-user";
	    /**
	     * An error occurred while attempting to perform a filter operation.
	     */
	    ErrorCodes["FilterCannotBePerformed"] = "filter-cannot-be-performed";
	    /**
	     * An error occurred within the Tableau Extensions API. Contact Tableau Support.
	     */
	    ErrorCodes["InternalError"] = "internal-error";
	    /**
	     * An invalid aggregation was specified for the filter, such as setting a range filter to "SUM(Sales)" instead of "Sales".
	     */
	    ErrorCodes["InvalidAggregationFieldName"] = "invalid-aggregation-field-name";
	    /**
	     * A dialog must first launch to, and send messages from, the same domain as the parent Extensions.
	     */
	    ErrorCodes["InvalidDomainDialog"] = "invalid-dialog-domain";
	    /**
	     * An invalid date was specified in a method that required a date parameter.
	     */
	    ErrorCodes["InvalidDateParameter"] = "invalid-date-parameter";
	    /**
	     * A filter operation was attempted on a field that does not exist in the data source.
	     */
	    ErrorCodes["InvalidFilterFieldName"] = "invalid-filter-field-name";
	    /**
	     * A filter operation was attempted using a value that is the wrong data type or format.
	     */
	    ErrorCodes["InvalidFilterFieldValue"] = "invalid-filter-field-value";
	    /**
	     * A parameter is not the correct data type or format. The name of the parameter is specified in the Error.message field.
	     */
	    ErrorCodes["InvalidParameter"] = "invalid-parameter";
	    /**
	     * An invalid date value was specified in a Sheet.selectMarksAsync() call for a date field.
	     */
	    ErrorCodes["InvalidSelectionDate"] = "invalid-selection-date";
	    /**
	     * A field was specified in a Sheet.selectMarksAsync() call that does not exist in the data source.
	     */
	    ErrorCodes["InvalidSelectionFieldName"] = "invalid-selection-field-name";
	    /**
	     * An invalid value was specified in a Sheet.selectMarksAsync() call.
	     */
	    ErrorCodes["InvalidSelectionValue"] = "invalid-selection-value";
	    /**
	     * A required parameter was not specified, null, or an empty string/array.
	     */
	    ErrorCodes["NullOrEmptyParameter"] = "null-or-empty-parameter";
	    /**
	     * An unknown event name was specified in the call to Viz.addEventListeneror Viz.removeEventListener.
	     */
	    ErrorCodes["UnsupportedEventName"] = "unsupported-event-name";
	    /**
	     * A method was used for a type of datasource that doesn't support that method (see getActiveTablesAsync for an example)
	     */
	    ErrorCodes["UnsupportedMethodForDataSourceType"] = "unsupported-method-for-data-source-type";
	})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
	/**
	 *  Type of aggregation on a field.
	 */
	var FieldAggregationType;
	(function (FieldAggregationType) {
	    FieldAggregationType["Sum"] = "sum";
	    FieldAggregationType["Avg"] = "avg";
	    FieldAggregationType["Min"] = "min";
	    FieldAggregationType["Max"] = "max";
	    FieldAggregationType["Stdev"] = "stdev";
	    FieldAggregationType["Stdevp"] = "stdevp";
	    FieldAggregationType["Var"] = "var";
	    FieldAggregationType["Varp"] = "varp";
	    FieldAggregationType["Count"] = "count";
	    FieldAggregationType["Countd"] = "countd";
	    FieldAggregationType["Median"] = "median";
	    FieldAggregationType["Attr"] = "attr";
	    FieldAggregationType["None"] = "none";
	    FieldAggregationType["Year"] = "year";
	    FieldAggregationType["Qtr"] = "qtr";
	    FieldAggregationType["Month"] = "month";
	    FieldAggregationType["Day"] = "day";
	    FieldAggregationType["Hour"] = "hour";
	    FieldAggregationType["Minute"] = "minute";
	    FieldAggregationType["Second"] = "second";
	    FieldAggregationType["Week"] = "week";
	    FieldAggregationType["Weekday"] = "weekday";
	    FieldAggregationType["MonthYear"] = "month-year";
	    FieldAggregationType["Mdy"] = "mdy";
	    FieldAggregationType["End"] = "end";
	    FieldAggregationType["TruncYear"] = "trunc-year";
	    FieldAggregationType["TruncQtr"] = "trunc-qtr";
	    FieldAggregationType["TruncMonth"] = "trunc-month";
	    FieldAggregationType["TruncWeek"] = "trunc-week";
	    FieldAggregationType["TruncDay"] = "trunc-day";
	    FieldAggregationType["TruncHour"] = "trunc-hour";
	    FieldAggregationType["TruncMinute"] = "trunc-minute";
	    FieldAggregationType["TruncSecond"] = "trunc-second";
	    FieldAggregationType["Quart1"] = "quart1";
	    FieldAggregationType["Quart3"] = "quart3";
	    FieldAggregationType["Skewness"] = "skewness";
	    FieldAggregationType["Kurtosis"] = "kurtosis";
	    FieldAggregationType["InOut"] = "in-out";
	    FieldAggregationType["User"] = "user";
	})(FieldAggregationType = exports.FieldAggregationType || (exports.FieldAggregationType = {}));
	/**
	 * Role of a field.
	 */
	var FieldRoleType;
	(function (FieldRoleType) {
	    FieldRoleType["Dimension"] = "dimension";
	    FieldRoleType["Measure"] = "measure";
	    FieldRoleType["Unknown"] = "unknown";
	})(FieldRoleType = exports.FieldRoleType || (exports.FieldRoleType = {}));
	/**
	 * An enumeration of the valid types of filters that can be applied.
	 */
	var FilterType;
	(function (FilterType) {
	    FilterType["Categorical"] = "categorical";
	    FilterType["Range"] = "range";
	    FilterType["Hierarchical"] = "hierarchical";
	    FilterType["RelativeDate"] = "relative-date";
	})(FilterType = exports.FilterType || (exports.FilterType = {}));
	/**
	 * The different update types for applying filter
	 */
	var FilterUpdateType;
	(function (FilterUpdateType) {
	    FilterUpdateType["Add"] = "add";
	    FilterUpdateType["All"] = "all";
	    FilterUpdateType["Replace"] = "replace";
	    FilterUpdateType["Remove"] = "remove";
	})(FilterUpdateType = exports.FilterUpdateType || (exports.FilterUpdateType = {}));
	/**
	 * The domain type for a filter
	 */
	var FilterDomainType;
	(function (FilterDomainType) {
	    /**
	     * The domain values that are relevant to the specified filter
	     * i.e. the domain is restricted by a previous filter
	     */
	    FilterDomainType["Relevant"] = "relevant";
	    /**
	     * list of all possible domain values from database
	     */
	    FilterDomainType["Database"] = "database";
	})(FilterDomainType = exports.FilterDomainType || (exports.FilterDomainType = {}));
	/**
	 * The option for specifying which values to include for filtering
	 * Indicates what to do with null values for a given filter or mark selection call.
	 */
	var FilterNullOption;
	(function (FilterNullOption) {
	    FilterNullOption["NullValues"] = "null-values";
	    FilterNullOption["NonNullValues"] = "non-null-values";
	    FilterNullOption["AllValues"] = "all-values";
	})(FilterNullOption = exports.FilterNullOption || (exports.FilterNullOption = {}));
	/**
	 * Type of mark for a given marks card in a viz.
	 */
	var MarkType;
	(function (MarkType) {
	    MarkType["Bar"] = "bar";
	    MarkType["Line"] = "line";
	    MarkType["Area"] = "area";
	    MarkType["Square"] = "square";
	    MarkType["Circle"] = "circle";
	    MarkType["Shape"] = "shape";
	    MarkType["Text"] = "text";
	    MarkType["Map"] = "map";
	    MarkType["Pie"] = "pie";
	    MarkType["GanttBar"] = "gantt-bar";
	    MarkType["Polygon"] = "polygon";
	})(MarkType = exports.MarkType || (exports.MarkType = {}));
	/**
	 * An enumeration describing the different types of allowable values.
	 * This is used for restricting the domain of a parameter
	 */
	var ParameterValueType;
	(function (ParameterValueType) {
	    ParameterValueType["All"] = "all";
	    ParameterValueType["List"] = "list";
	    ParameterValueType["Range"] = "range";
	})(ParameterValueType = exports.ParameterValueType || (exports.ParameterValueType = {}));
	/**
	 * Date period used in filters and in parameters.
	 */
	var PeriodType;
	(function (PeriodType) {
	    PeriodType["Years"] = "years";
	    PeriodType["Quarters"] = "quarters";
	    PeriodType["Months"] = "months";
	    PeriodType["Weeks"] = "weeks";
	    PeriodType["Days"] = "days";
	    PeriodType["Hours"] = "hours";
	    PeriodType["Minutes"] = "minutes";
	    PeriodType["Seconds"] = "seconds";
	})(PeriodType = exports.PeriodType || (exports.PeriodType = {}));
	var QuickTableCalcType;
	(function (QuickTableCalcType) {
	    QuickTableCalcType["RunningTotal"] = "running-total";
	    QuickTableCalcType["Difference"] = "difference";
	    QuickTableCalcType["PercentDifference"] = "percent-difference";
	    QuickTableCalcType["PercentOfTotal"] = "percent-of-total";
	    QuickTableCalcType["Rank"] = "rank";
	    QuickTableCalcType["Percentile"] = "percentile";
	    QuickTableCalcType["MovingAverage"] = "moving-average";
	    QuickTableCalcType["YTDTotal"] = "ytd-total";
	    QuickTableCalcType["CompoundGrowthRate"] = "compound-growth-rate";
	    QuickTableCalcType["YearOverYearGrowth"] = "year-over-year-growth";
	    QuickTableCalcType["YTDGrowth"] = "ytd-growth";
	    QuickTableCalcType["Undefined"] = "undefined";
	})(QuickTableCalcType = exports.QuickTableCalcType || (exports.QuickTableCalcType = {}));
	/**
	 * Enum for specifying the selection type for select marks api.
	 */
	var SelectionUpdateType;
	(function (SelectionUpdateType) {
	    SelectionUpdateType["Replace"] = "select-replace";
	    SelectionUpdateType["Add"] = "select-add";
	    SelectionUpdateType["Remove"] = "select-remove";
	})(SelectionUpdateType = exports.SelectionUpdateType || (exports.SelectionUpdateType = {}));
	/**
	 * The type of sheet a Sheet object represents
	 */
	var SheetType;
	(function (SheetType) {
	    SheetType["Dashboard"] = "dashboard";
	    SheetType["Story"] = "story";
	    SheetType["Worksheet"] = "worksheet";
	})(SheetType = exports.SheetType || (exports.SheetType = {}));
	var SortDirection;
	(function (SortDirection) {
	    SortDirection["Increasing"] = "increasing";
	    SortDirection["Decreasing"] = "decreasing";
	})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
	/**
	 * Represents a certain type of event which can be listened for
	 */
	var TableauEventType;
	(function (TableauEventType) {
	    /** Raised when any filter has changed state.*/
	    TableauEventType["FilterChanged"] = "filter-changed";
	    /** The selected marks on a visualization has changed */
	    TableauEventType["MarkSelectionChanged"] = "mark-selection-changed";
	    /** A parameter has had its value modified */
	    TableauEventType["ParameterChanged"] = "parameter-changed";
	})(TableauEventType = exports.TableauEventType || (exports.TableauEventType = {}));
	var TrendLineModelType;
	(function (TrendLineModelType) {
	    TrendLineModelType["Linear"] = "linear";
	    TrendLineModelType["Logarithmic"] = "logarithmic";
	    TrendLineModelType["Exponential"] = "exponential";
	    TrendLineModelType["Polynomial"] = "polynomial";
	})(TrendLineModelType = exports.TrendLineModelType || (exports.TrendLineModelType = {}));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauSheetEvent_1 = __webpack_require__(23);
	var TableauWorksheetEvent = (function (_super) {
	    __extends(TableauWorksheetEvent, _super);
	    function TableauWorksheetEvent(type, _worksheet) {
	        var _this = _super.call(this, type, _worksheet) || this;
	        _this._worksheet = _worksheet;
	        return _this;
	    }
	    Object.defineProperty(TableauWorksheetEvent.prototype, "worksheet", {
	        get: function () {
	            return this._worksheet;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return TableauWorksheetEvent;
	}(TableauSheetEvent_1.TableauSheetEvent));
	exports.TableauWorksheetEvent = TableauWorksheetEvent;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauEvent_1 = __webpack_require__(24);
	var TableauSheetEvent = (function (_super) {
	    __extends(TableauSheetEvent, _super);
	    function TableauSheetEvent(type, sheet) {
	        var _this = _super.call(this, type) || this;
	        _this._sheet = sheet;
	        return _this;
	    }
	    Object.defineProperty(TableauSheetEvent.prototype, "sheet", {
	        get: function () {
	            return this._sheet;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return TableauSheetEvent;
	}(TableauEvent_1.TableauEvent));
	exports.TableauSheetEvent = TableauSheetEvent;


/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var TableauEvent = (function () {
	    function TableauEvent(type) {
	        this._type = type;
	    }
	    Object.defineProperty(TableauEvent.prototype, "type", {
	        get: function () {
	            return this._type;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return TableauEvent;
	}());
	exports.TableauEvent = TableauEvent;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var TableauWorksheetEvent_1 = __webpack_require__(22);
	var MarksSelectedEvent = (function (_super) {
	    __extends(MarksSelectedEvent, _super);
	    function MarksSelectedEvent(worksheet) {
	        return _super.call(this, Contract.TableauEventType.MarkSelectionChanged, worksheet) || this;
	    }
	    MarksSelectedEvent.prototype.getMarksAsync = function () {
	        return this.worksheet.getSelectedMarksAsync();
	    };
	    return MarksSelectedEvent;
	}(TableauWorksheetEvent_1.TableauWorksheetEvent));
	exports.MarksSelectedEvent = MarksSelectedEvent;


/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * This class implements the SingleEventManager interface for a single type of Tableau event
	 *
	 * @template TEventType The Tableau event type this class specializes
	 */
	var SingleEventManagerImpl = (function () {
	    function SingleEventManagerImpl(eventType) {
	        this._eventType = eventType;
	        this._handlers = [];
	    }
	    Object.defineProperty(SingleEventManagerImpl.prototype, "eventType", {
	        get: function () {
	            return this._eventType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SingleEventManagerImpl.prototype.addEventListener = function (handler) {
	        var _this = this;
	        this._handlers.push(handler);
	        return function () { return _this.removeEventListener(handler); };
	    };
	    SingleEventManagerImpl.prototype.removeEventListener = function (handler) {
	        var beforeCount = this._handlers.length;
	        this._handlers = this._handlers.filter(function (h) { return h !== handler; });
	        return beforeCount > this._handlers.length;
	    };
	    SingleEventManagerImpl.prototype.triggerEvent = function (eventGenerator) {
	        for (var _i = 0, _a = this._handlers; _i < _a.length; _i++) {
	            var handler = _a[_i];
	            try {
	                var eventModel = eventGenerator();
	                handler(eventModel);
	            }
	            catch (e) {
	                // Since this handler could be outside our control, just catch anything it throws and continue on
	                continue;
	            }
	        }
	    };
	    return SingleEventManagerImpl;
	}());
	exports.SingleEventManagerImpl = SingleEventManagerImpl;


/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Defines which type of getData call to make.
	 */
	var GetDataType;
	(function (GetDataType) {
	    GetDataType["Summary"] = "summary";
	    GetDataType["Underlying"] = "underlying";
	})(GetDataType = exports.GetDataType || (exports.GetDataType = {}));


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var DataSourceServiceImpl_1 = __webpack_require__(29);
	var FilterServiceImpl_1 = __webpack_require__(31);
	var GetDataServiceImpl_1 = __webpack_require__(36);
	var NotificationServiceImpl_1 = __webpack_require__(37);
	var ParametersServiceImpl_1 = __webpack_require__(38);
	var SelectionServiceImpl_1 = __webpack_require__(41);
	var ServiceRegistry_1 = __webpack_require__(35);
	function registerAllSharedServices(dispatcher) {
	    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new DataSourceServiceImpl_1.DataSourceServiceImpl(dispatcher));
	    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new GetDataServiceImpl_1.GetDataServiceImpl(dispatcher));
	    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new FilterServiceImpl_1.FilterServiceImpl(dispatcher));
	    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new NotificationServiceImpl_1.NotificationServiceImpl(dispatcher));
	    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new ParametersServiceImpl_1.ParametersServiceImpl(dispatcher));
	    ServiceRegistry_1.ApiServiceRegistry.instance.registerService(new SelectionServiceImpl_1.SelectionServiceImpl(dispatcher));
	}
	exports.registerAllSharedServices = registerAllSharedServices;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_external_contract_1 = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	var DataSourceServiceImpl = (function () {
	    function DataSourceServiceImpl(_dispatcher) {
	        this._dispatcher = _dispatcher;
	    }
	    Object.defineProperty(DataSourceServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "data-source-service" /* DataSourceService */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DataSourceServiceImpl.prototype.refreshAsync = function (dataSourceId) {
	        var parameters = (_a = {}, _a[api_internal_contract_1.ParameterId.DataSourceId] = dataSourceId, _a);
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.RefreshDataSource, parameters).then(function (response) {
	            return;
	        });
	        var _a;
	    };
	    DataSourceServiceImpl.prototype.getActiveTablesAsync = function (dataSourceId) {
	        var joinParameters = (_a = {}, _a[api_internal_contract_1.ParameterId.DataSourceId] = dataSourceId, _a);
	        // Get the description of the tables used by this connection
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.GetJoinDescription, joinParameters).then(function (joinResponse) {
	            var joinDescription = joinResponse.result;
	            // getActiveTables is unsupported for cubes and GA. We do not have a connection type property
	            // available from the platform (intentionally, to reduce code churn as new connections are added).
	            // Instead,just check if any tables are returned. This array will be empty for any non-table based datasource.
	            if (joinDescription.tables.length === 0) {
	                throw api_utils_1.TableauException.error('getActiveTablesAsync is unsupported for DataSource.', [api_external_contract_1.ErrorCodes.UnsupportedMethodForDataSourceType]);
	            }
	            return joinDescription.tables;
	        });
	        var _a;
	    };
	    DataSourceServiceImpl.prototype.getDataSourcesAsync = function () {
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.GetDataSources, {}).then(function (response) {
	            var dataSchema = response.result;
	            return dataSchema;
	        });
	    };
	    return DataSourceServiceImpl;
	}());
	exports.DataSourceServiceImpl = DataSourceServiceImpl;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(3));
	__export(__webpack_require__(4));
	__export(__webpack_require__(5));
	__export(__webpack_require__(6));
	__export(__webpack_require__(7));


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	var ExternalToInternalEnumMappings_1 = __webpack_require__(32);
	var InternalToExternalEnumMappings_1 = __webpack_require__(33);
	var FilterModels_1 = __webpack_require__(34);
	var GetDataModels_1 = __webpack_require__(17);
	var FilterServiceImpl = (function () {
	    function FilterServiceImpl(dispatcher) {
	        this._dispatcher = dispatcher;
	    }
	    Object.defineProperty(FilterServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "filter-service" /* Filter */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FilterServiceImpl.prototype.applyFilterAsync = function (visualId, fieldName, values, updateType, filterOptions) {
	        if (!api_utils_1.Param.isValidEnumValue(updateType, Contract.FilterUpdateType)) {
	            throw api_utils_1.TableauException.invalidParamValue(['FilterUpdateType']);
	        }
	        var verb = api_internal_contract_1.VerbId.ApplyCategoricalFilter;
	        var parameters = {};
	        parameters[api_internal_contract_1.ParameterId.VisualId] = visualId;
	        parameters[api_internal_contract_1.ParameterId.FieldName] = fieldName;
	        parameters[api_internal_contract_1.ParameterId.FilterValues] = values;
	        parameters[api_internal_contract_1.ParameterId.FilterUpdateType] = updateType;
	        parameters[api_internal_contract_1.ParameterId.IsExcludeMode] =
	            (filterOptions === undefined || filterOptions.isExcludeMode === undefined) ? false : filterOptions.isExcludeMode;
	        return this._dispatcher.execute(verb, parameters).then(function (response) {
	            var error = response.result;
	            if (!(error.errorCode === null || error.errorCode === undefined)) {
	                // TODO: come back and implement error handling logic
	                throw api_utils_1.TableauException.error(FilterServiceImpl.FILTER_ERROR, [error.errorCode]);
	            }
	            return fieldName;
	        });
	    };
	    FilterServiceImpl.prototype.applyRangeFilterAsync = function (visualId, fieldName, filterOptions) {
	        if (!filterOptions) {
	            throw api_utils_1.TableauException.missingParameter(['RangeFilterOptions']);
	        }
	        api_utils_1.Param.verifyRangeParamType(filterOptions.min, filterOptions.max);
	        var verb = api_internal_contract_1.VerbId.ApplyRangeFilter;
	        var parameters = {};
	        if (filterOptions.min) {
	            var min = void 0;
	            if (filterOptions.min instanceof Date) {
	                min = api_utils_1.Param.serializeDateForPlatform(filterOptions.min);
	            }
	            else {
	                min = filterOptions.min;
	            }
	            parameters[api_internal_contract_1.ParameterId.FilterRangeMin] = min;
	        }
	        if (filterOptions.max) {
	            var max = void 0;
	            if (filterOptions.max instanceof Date) {
	                max = api_utils_1.Param.serializeDateForPlatform(filterOptions.max);
	            }
	            else {
	                max = filterOptions.max;
	            }
	            parameters[api_internal_contract_1.ParameterId.FilterRangeMax] = max;
	        }
	        if (filterOptions.nullOption) {
	            if (!api_utils_1.Param.isValidEnumValue(filterOptions.nullOption, Contract.FilterNullOption)) {
	                throw api_utils_1.TableauException.invalidParamValue(['NullOption']);
	            }
	            parameters[api_internal_contract_1.ParameterId.FilterRangeNullOption] = ExternalToInternalEnumMappings_1.ExternalToInternalEnumMappings.nullOptions.convert(filterOptions.nullOption);
	        }
	        parameters[api_internal_contract_1.ParameterId.FieldName] = fieldName;
	        parameters[api_internal_contract_1.ParameterId.VisualId] = visualId;
	        return this._dispatcher.execute(verb, parameters).then(function (response) {
	            return fieldName;
	        });
	    };
	    FilterServiceImpl.prototype.clearFilterAsync = function (visualId, fieldName) {
	        var verb = api_internal_contract_1.VerbId.ClearFilter;
	        var parameters = {};
	        parameters[api_internal_contract_1.ParameterId.VisualId] = visualId;
	        parameters[api_internal_contract_1.ParameterId.FieldName] = fieldName;
	        return this._dispatcher.execute(verb, parameters).then(function (resposne) {
	            return fieldName;
	        });
	    };
	    FilterServiceImpl.prototype.getFiltersAsync = function (visualId) {
	        var _this = this;
	        var verb = api_internal_contract_1.VerbId.GetFilters;
	        var parameters = {};
	        parameters[api_internal_contract_1.ParameterId.VisualId] = visualId;
	        return this._dispatcher.execute(verb, parameters).then(function (response) {
	            var filters = response.result;
	            return _this.convertDomainFilters(filters);
	        });
	    };
	    FilterServiceImpl.prototype.getCategoricalDomainAsync = function (worksheetName, fieldId, domainType) {
	        var _this = this;
	        if (!api_utils_1.Param.isValidEnumValue(domainType, Contract.FilterDomainType)) {
	            throw new Error('Invalid value for parameter FilterDomainType');
	        }
	        var verb = api_internal_contract_1.VerbId.GetCategoricalDomain;
	        var parameters = {};
	        parameters[api_internal_contract_1.ParameterId.VisualId] = {
	            worksheet: worksheetName
	        };
	        parameters[api_internal_contract_1.ParameterId.FieldId] = fieldId;
	        parameters[api_internal_contract_1.ParameterId.DomainType] = domainType;
	        return this._dispatcher.execute(verb, parameters).then(function (response) {
	            var domain = response.result;
	            return _this.convertCategoricalDomain(domain, domainType);
	        });
	    };
	    FilterServiceImpl.prototype.getRangeDomainAsync = function (worksheetName, fieldId, domainType) {
	        var _this = this;
	        if (!api_utils_1.Param.isValidEnumValue(domainType, Contract.FilterDomainType)) {
	            throw new Error('Invalid value for parameter FilterDomainType');
	        }
	        var verb = api_internal_contract_1.VerbId.GetRangeDomain;
	        var parameters = {};
	        parameters[api_internal_contract_1.ParameterId.VisualId] = {
	            worksheet: worksheetName
	        };
	        parameters[api_internal_contract_1.ParameterId.FieldId] = fieldId;
	        parameters[api_internal_contract_1.ParameterId.DomainType] = ExternalToInternalEnumMappings_1.ExternalToInternalEnumMappings.filterDomainType.convert(domainType);
	        return this._dispatcher.execute(verb, parameters).then(function (response) {
	            var domain = response.result;
	            return _this.convertRangeDomain(domain, domainType);
	        });
	    };
	    // Helper Methods
	    FilterServiceImpl.prototype.convertDomainFilters = function (domainFilters) {
	        var _this = this;
	        var filters = [];
	        domainFilters.forEach(function (domainFilter) {
	            switch (domainFilter.filterType) {
	                case api_internal_contract_1.FilterType.Categorical: {
	                    var filter = domainFilter;
	                    if (filter) {
	                        filters.push(_this.convertCategoricalFilter(filter));
	                    }
	                    else {
	                        throw new Error('Invalid Categorical Filter');
	                    }
	                    break;
	                }
	                case api_internal_contract_1.FilterType.Range: {
	                    var filter = domainFilter;
	                    if (filter) {
	                        filters.push(_this.convertRangeFilter(filter));
	                    }
	                    else {
	                        throw new Error('Invalid Range Filter');
	                    }
	                    break;
	                }
	                case api_internal_contract_1.FilterType.RelativeDate: {
	                    var filter = domainFilter;
	                    if (filter) {
	                        filters.push(_this.convertRelativeDateFilter(filter));
	                    }
	                    else {
	                        throw new Error('Invalid Relative Date Filter');
	                    }
	                    break;
	                }
	                default: {
	                    break;
	                }
	            }
	        });
	        return filters;
	    };
	    FilterServiceImpl.prototype.convertCategoricalFilter = function (domainFilter) {
	        var appliedValues = domainFilter.values.map(function (dv) {
	            return new GetDataModels_1.DataValue(dv.value, dv.formattedValue);
	        });
	        return new FilterModels_1.CategoricalFilter(domainFilter.visualId.worksheet, domainFilter.fieldCaption, domainFilter.fieldName, Contract.FilterType.Categorical, appliedValues, domainFilter.isExclude);
	    };
	    FilterServiceImpl.prototype.convertRangeFilter = function (domainFilter) {
	        var minValue = new GetDataModels_1.DataValue(domainFilter.min.value, domainFilter.min.formattedValue);
	        var maxValue = new GetDataModels_1.DataValue(domainFilter.max.value, domainFilter.max.formattedValue);
	        return new FilterModels_1.RangeFilter(domainFilter.visualId.worksheet, domainFilter.fieldCaption, domainFilter.fieldName, Contract.FilterType.Range, minValue, maxValue, domainFilter.includeNullValues);
	    };
	    FilterServiceImpl.prototype.convertRelativeDateFilter = function (domainFilter) {
	        var anchorDateValue = new GetDataModels_1.DataValue(domainFilter.anchorDate.value, domainFilter.anchorDate.formattedValue);
	        return new FilterModels_1.RelativeDateFilter(domainFilter.visualId.worksheet, domainFilter.fieldCaption, domainFilter.fieldName, Contract.FilterType.RelativeDate, anchorDateValue, InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.dateStepPeriod.convert(domainFilter.periodType), InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.dateRangeType.convert(domainFilter.rangeType), domainFilter.rangeN);
	    };
	    FilterServiceImpl.prototype.convertCategoricalDomain = function (domain, domainType) {
	        var values = domain.values.map(function (domainDv) {
	            return new GetDataModels_1.DataValue(domainDv.value, domainDv.formattedValue);
	        });
	        return new FilterModels_1.CategoricalDomain(values, domainType);
	    };
	    FilterServiceImpl.prototype.convertRangeDomain = function (domain, domainType) {
	        var min = new GetDataModels_1.DataValue(domain.min.value, domain.min.formattedValue);
	        var max = new GetDataModels_1.DataValue(domain.max.value, domain.max.formattedValue);
	        return new FilterModels_1.RangeDomain(min, max, domainType);
	    };
	    FilterServiceImpl.FILTER_ERROR = 'Error Applying Filter: %1';
	    return FilterServiceImpl;
	}());
	exports.FilterServiceImpl = FilterServiceImpl;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_external_contract_1 = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	/* tslint:disable:typedef - Disable this to make declaring these classes a bit easier */
	/**
	 * Maps enums used by the external-api-contract to the enums used
	 * in the internal-api-contract, which developers code against.
	 */
	var ExternalToInternalEnumMappings = (function () {
	    function ExternalToInternalEnumMappings() {
	    }
	    ExternalToInternalEnumMappings.nullOptions = new api_utils_1.EnumConverter((_a = {},
	        _a[api_external_contract_1.FilterNullOption.AllValues] = api_internal_contract_1.FilterNullOption.AllValues,
	        _a[api_external_contract_1.FilterNullOption.NonNullValues] = api_internal_contract_1.FilterNullOption.NonNullValues,
	        _a[api_external_contract_1.FilterNullOption.NonNullValues] = api_internal_contract_1.FilterNullOption.NullValues,
	        _a));
	    ExternalToInternalEnumMappings.filterDomainType = new api_utils_1.EnumConverter((_b = {},
	        _b[api_external_contract_1.FilterDomainType.Relevant] = api_internal_contract_1.FilterDomainType.Relevant,
	        _b[api_external_contract_1.FilterDomainType.Database] = api_internal_contract_1.FilterDomainType.Database,
	        _b));
	    return ExternalToInternalEnumMappings;
	}());
	exports.ExternalToInternalEnumMappings = ExternalToInternalEnumMappings;
	var _a, _b;
	/* tslint:enable:typedef */


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_external_contract_1 = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	/* tslint:disable:typedef - Disable this to make declaring these classes a bit easier */
	/**
	 * Maps enums used by the internal-api-contract to the enums used
	 * in the external-api-contract, which developers code against.
	 */
	var InternalToExternalEnumMappings = (function () {
	    function InternalToExternalEnumMappings() {
	    }
	    InternalToExternalEnumMappings.extensionContext = new api_utils_1.EnumConverter((_a = {},
	        _a[api_internal_contract_1.ExtensionContext.Desktop] = api_external_contract_1.ExtensionContext.Desktop,
	        _a[api_internal_contract_1.ExtensionContext.Server] = api_external_contract_1.ExtensionContext.Server,
	        _a));
	    InternalToExternalEnumMappings.extensionMode = new api_utils_1.EnumConverter((_b = {},
	        _b[api_internal_contract_1.ExtensionMode.Authoring] = api_external_contract_1.ExtensionMode.Authoring,
	        _b[api_internal_contract_1.ExtensionMode.Viewing] = api_external_contract_1.ExtensionMode.Viewing,
	        _b));
	    InternalToExternalEnumMappings.columnType = new api_utils_1.EnumConverter((_c = {},
	        _c[api_internal_contract_1.ColumnType.Continuous] = api_external_contract_1.ColumnType.Continuous,
	        _c[api_internal_contract_1.ColumnType.Discrete] = api_external_contract_1.ColumnType.Discrete,
	        _c));
	    InternalToExternalEnumMappings.fieldAggregationType = new api_utils_1.EnumConverter((_d = {},
	        _d[api_internal_contract_1.FieldAggregationType.Attr] = api_external_contract_1.FieldAggregationType.Attr,
	        _d[api_internal_contract_1.FieldAggregationType.Avg] = api_external_contract_1.FieldAggregationType.Avg,
	        _d[api_internal_contract_1.FieldAggregationType.Count] = api_external_contract_1.FieldAggregationType.Count,
	        _d[api_internal_contract_1.FieldAggregationType.Countd] = api_external_contract_1.FieldAggregationType.Countd,
	        _d[api_internal_contract_1.FieldAggregationType.Day] = api_external_contract_1.FieldAggregationType.Day,
	        _d[api_internal_contract_1.FieldAggregationType.End] = api_external_contract_1.FieldAggregationType.End,
	        _d[api_internal_contract_1.FieldAggregationType.Hour] = api_external_contract_1.FieldAggregationType.Hour,
	        _d[api_internal_contract_1.FieldAggregationType.InOut] = api_external_contract_1.FieldAggregationType.InOut,
	        _d[api_internal_contract_1.FieldAggregationType.Kurtosis] = api_external_contract_1.FieldAggregationType.Kurtosis,
	        _d[api_internal_contract_1.FieldAggregationType.Max] = api_external_contract_1.FieldAggregationType.Max,
	        _d[api_internal_contract_1.FieldAggregationType.Mdy] = api_external_contract_1.FieldAggregationType.Mdy,
	        _d[api_internal_contract_1.FieldAggregationType.Median] = api_external_contract_1.FieldAggregationType.Median,
	        _d[api_internal_contract_1.FieldAggregationType.Min] = api_external_contract_1.FieldAggregationType.Min,
	        _d[api_internal_contract_1.FieldAggregationType.Minute] = api_external_contract_1.FieldAggregationType.Minute,
	        _d[api_internal_contract_1.FieldAggregationType.MonthYear] = api_external_contract_1.FieldAggregationType.MonthYear,
	        _d[api_internal_contract_1.FieldAggregationType.None] = api_external_contract_1.FieldAggregationType.None,
	        _d[api_internal_contract_1.FieldAggregationType.Qtr] = api_external_contract_1.FieldAggregationType.Qtr,
	        _d[api_internal_contract_1.FieldAggregationType.Quart1] = api_external_contract_1.FieldAggregationType.Quart1,
	        _d[api_internal_contract_1.FieldAggregationType.Quart3] = api_external_contract_1.FieldAggregationType.Quart3,
	        _d[api_internal_contract_1.FieldAggregationType.Second] = api_external_contract_1.FieldAggregationType.Second,
	        _d[api_internal_contract_1.FieldAggregationType.Skewness] = api_external_contract_1.FieldAggregationType.Skewness,
	        _d[api_internal_contract_1.FieldAggregationType.Stdev] = api_external_contract_1.FieldAggregationType.Stdev,
	        _d[api_internal_contract_1.FieldAggregationType.Stdevp] = api_external_contract_1.FieldAggregationType.Stdevp,
	        _d[api_internal_contract_1.FieldAggregationType.Sum] = api_external_contract_1.FieldAggregationType.Sum,
	        _d[api_internal_contract_1.FieldAggregationType.TruncDay] = api_external_contract_1.FieldAggregationType.TruncDay,
	        _d[api_internal_contract_1.FieldAggregationType.TruncHour] = api_external_contract_1.FieldAggregationType.TruncHour,
	        _d[api_internal_contract_1.FieldAggregationType.TruncMinute] = api_external_contract_1.FieldAggregationType.TruncMinute,
	        _d[api_internal_contract_1.FieldAggregationType.TruncMonth] = api_external_contract_1.FieldAggregationType.TruncMonth,
	        _d[api_internal_contract_1.FieldAggregationType.TruncQtr] = api_external_contract_1.FieldAggregationType.TruncQtr,
	        _d[api_internal_contract_1.FieldAggregationType.TruncSecond] = api_external_contract_1.FieldAggregationType.TruncSecond,
	        _d[api_internal_contract_1.FieldAggregationType.TruncWeek] = api_external_contract_1.FieldAggregationType.TruncWeek,
	        _d[api_internal_contract_1.FieldAggregationType.TruncYear] = api_external_contract_1.FieldAggregationType.TruncYear,
	        _d[api_internal_contract_1.FieldAggregationType.User] = api_external_contract_1.FieldAggregationType.User,
	        _d[api_internal_contract_1.FieldAggregationType.Var] = api_external_contract_1.FieldAggregationType.Var,
	        _d[api_internal_contract_1.FieldAggregationType.Varp] = api_external_contract_1.FieldAggregationType.Varp,
	        _d[api_internal_contract_1.FieldAggregationType.Week] = api_external_contract_1.FieldAggregationType.Week,
	        _d[api_internal_contract_1.FieldAggregationType.Weekday] = api_external_contract_1.FieldAggregationType.Weekday,
	        _d[api_internal_contract_1.FieldAggregationType.Year] = api_external_contract_1.FieldAggregationType.Year,
	        _d));
	    InternalToExternalEnumMappings.fieldRoleType = new api_utils_1.EnumConverter((_e = {},
	        _e[api_internal_contract_1.FieldRoleType.Dimension] = api_external_contract_1.FieldRoleType.Dimension,
	        _e[api_internal_contract_1.FieldRoleType.Measure] = api_external_contract_1.FieldRoleType.Measure,
	        _e[api_internal_contract_1.FieldRoleType.Unknown] = api_external_contract_1.FieldRoleType.Unknown,
	        _e));
	    InternalToExternalEnumMappings.sheetType = new api_utils_1.EnumConverter((_f = {},
	        _f[api_internal_contract_1.SheetType.Dashboard] = api_external_contract_1.SheetType.Dashboard,
	        _f[api_internal_contract_1.SheetType.Story] = api_external_contract_1.SheetType.Story,
	        _f[api_internal_contract_1.SheetType.Worksheet] = api_external_contract_1.SheetType.Worksheet,
	        _f));
	    InternalToExternalEnumMappings.dashboardObjectType = new api_utils_1.EnumConverter((_g = {},
	        _g[api_internal_contract_1.DashboardObjectType.Extension] = api_external_contract_1.DashboardObjectType.Extension,
	        _g[api_internal_contract_1.DashboardObjectType.Blank] = api_external_contract_1.DashboardObjectType.Blank,
	        _g[api_internal_contract_1.DashboardObjectType.Image] = api_external_contract_1.DashboardObjectType.Image,
	        _g[api_internal_contract_1.DashboardObjectType.Legend] = api_external_contract_1.DashboardObjectType.Legend,
	        _g[api_internal_contract_1.DashboardObjectType.PageFilter] = api_external_contract_1.DashboardObjectType.PageFilter,
	        _g[api_internal_contract_1.DashboardObjectType.ParameterControl] = api_external_contract_1.DashboardObjectType.ParameterControl,
	        _g[api_internal_contract_1.DashboardObjectType.QuickFilter] = api_external_contract_1.DashboardObjectType.QuickFilter,
	        _g[api_internal_contract_1.DashboardObjectType.Text] = api_external_contract_1.DashboardObjectType.Text,
	        _g[api_internal_contract_1.DashboardObjectType.Title] = api_external_contract_1.DashboardObjectType.Title,
	        _g[api_internal_contract_1.DashboardObjectType.WebPage] = api_external_contract_1.DashboardObjectType.WebPage,
	        _g[api_internal_contract_1.DashboardObjectType.Worksheet] = api_external_contract_1.DashboardObjectType.Worksheet,
	        _g));
	    InternalToExternalEnumMappings.dataType = new api_utils_1.EnumConverter((_h = {},
	        _h[api_internal_contract_1.DataType.Bool] = api_external_contract_1.DataType.Bool,
	        _h[api_internal_contract_1.DataType.Date] = api_external_contract_1.DataType.Date,
	        _h[api_internal_contract_1.DataType.DateTime] = api_external_contract_1.DataType.DateTime,
	        _h[api_internal_contract_1.DataType.Float] = api_external_contract_1.DataType.Float,
	        _h[api_internal_contract_1.DataType.Int] = api_external_contract_1.DataType.Int,
	        _h[api_internal_contract_1.DataType.String] = api_external_contract_1.DataType.String,
	        _h));
	    InternalToExternalEnumMappings.filterUpdateType = new api_utils_1.EnumConverter((_j = {},
	        _j[api_internal_contract_1.FilterUpdateType.Add] = api_external_contract_1.FilterUpdateType.Add,
	        _j[api_internal_contract_1.FilterUpdateType.All] = api_external_contract_1.FilterUpdateType.All,
	        _j[api_internal_contract_1.FilterUpdateType.Remove] = api_external_contract_1.FilterUpdateType.Remove,
	        _j[api_internal_contract_1.FilterUpdateType.Replace] = api_external_contract_1.FilterUpdateType.Replace,
	        _j));
	    InternalToExternalEnumMappings.allowableValues = new api_utils_1.EnumConverter((_k = {},
	        _k[api_internal_contract_1.DomainRestrictionType.All] = api_external_contract_1.ParameterValueType.All,
	        _k[api_internal_contract_1.DomainRestrictionType.List] = api_external_contract_1.ParameterValueType.List,
	        _k[api_internal_contract_1.DomainRestrictionType.Range] = api_external_contract_1.ParameterValueType.Range,
	        _k));
	    InternalToExternalEnumMappings.dateStepPeriod = new api_utils_1.EnumConverter((_l = {},
	        _l[api_internal_contract_1.DateStepPeriod.Years] = api_external_contract_1.PeriodType.Years,
	        _l[api_internal_contract_1.DateStepPeriod.Quarters] = api_external_contract_1.PeriodType.Quarters,
	        _l[api_internal_contract_1.DateStepPeriod.Months] = api_external_contract_1.PeriodType.Months,
	        _l[api_internal_contract_1.DateStepPeriod.Weeks] = api_external_contract_1.PeriodType.Weeks,
	        _l[api_internal_contract_1.DateStepPeriod.Days] = api_external_contract_1.PeriodType.Days,
	        _l[api_internal_contract_1.DateStepPeriod.Hours] = api_external_contract_1.PeriodType.Hours,
	        _l[api_internal_contract_1.DateStepPeriod.Minutes] = api_external_contract_1.PeriodType.Minutes,
	        _l[api_internal_contract_1.DateStepPeriod.Seconds] = api_external_contract_1.PeriodType.Seconds,
	        _l));
	    InternalToExternalEnumMappings.dateRangeType = new api_utils_1.EnumConverter((_m = {},
	        _m[api_internal_contract_1.DateRangeType.Current] = api_external_contract_1.DateRangeType.Current,
	        _m[api_internal_contract_1.DateRangeType.Last] = api_external_contract_1.DateRangeType.Last,
	        _m[api_internal_contract_1.DateRangeType.LastN] = api_external_contract_1.DateRangeType.LastN,
	        _m[api_internal_contract_1.DateRangeType.Next] = api_external_contract_1.DateRangeType.Next,
	        _m[api_internal_contract_1.DateRangeType.NextN] = api_external_contract_1.DateRangeType.NextN,
	        _m[api_internal_contract_1.DateRangeType.ToDate] = api_external_contract_1.DateRangeType.ToDate,
	        _m));
	    InternalToExternalEnumMappings.filterType = new api_utils_1.EnumConverter((_o = {},
	        _o[api_internal_contract_1.FilterType.Categorical] = api_external_contract_1.FilterType.Categorical,
	        _o[api_internal_contract_1.FilterType.Range] = api_external_contract_1.FilterType.Range,
	        _o[api_internal_contract_1.FilterType.RelativeDate] = api_external_contract_1.FilterType.RelativeDate,
	        _o[api_internal_contract_1.FilterType.Hierarchical] = api_external_contract_1.FilterType.Hierarchical,
	        _o));
	    return InternalToExternalEnumMappings;
	}());
	exports.InternalToExternalEnumMappings = InternalToExternalEnumMappings;
	var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
	/* tslint:enable:typedef */


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var ServiceRegistry_1 = __webpack_require__(35);
	var Filter = (function () {
	    function Filter(_worksheetName, _fieldName, _filterType, _fieldId) {
	        this._worksheetName = _worksheetName;
	        this._fieldName = _fieldName;
	        this._filterType = _filterType;
	        this._fieldId = _fieldId;
	    }
	    Object.defineProperty(Filter.prototype, "worksheetName", {
	        get: function () {
	            return this._worksheetName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Filter.prototype, "fieldName", {
	        get: function () {
	            return this._fieldName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Filter.prototype, "fieldId", {
	        get: function () {
	            return this._fieldId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Filter.prototype, "filterType", {
	        get: function () {
	            return this._filterType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Filter.prototype.getFieldAsync = function () {
	        throw new Error('Method not implemented');
	    };
	    return Filter;
	}());
	exports.Filter = Filter;
	var CategoricalFilter = (function (_super) {
	    __extends(CategoricalFilter, _super);
	    function CategoricalFilter(worksheetName, fieldName, fieldId, filterType, _appliedValues, _isExcludeMode) {
	        var _this = _super.call(this, worksheetName, fieldName, filterType, fieldId) || this;
	        _this._appliedValues = _appliedValues;
	        _this._isExcludeMode = _isExcludeMode;
	        return _this;
	    }
	    Object.defineProperty(CategoricalFilter.prototype, "appliedValues", {
	        get: function () {
	            return this._appliedValues;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CategoricalFilter.prototype, "isExcludeMode", {
	        get: function () {
	            return this._isExcludeMode;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CategoricalFilter.prototype.getDomainAsync = function (domainType) {
	        if (!domainType) {
	            domainType = Contract.FilterDomainType.Relevant;
	        }
	        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
	        return service.getCategoricalDomainAsync(this._worksheetName, this._fieldId, domainType);
	    };
	    return CategoricalFilter;
	}(Filter));
	exports.CategoricalFilter = CategoricalFilter;
	var RangeFilter = (function (_super) {
	    __extends(RangeFilter, _super);
	    function RangeFilter(worksheetName, fieldName, fieldId, filterType, _min, _max, _includeNullValues) {
	        var _this = _super.call(this, worksheetName, fieldName, filterType, fieldId) || this;
	        _this._min = _min;
	        _this._max = _max;
	        _this._includeNullValues = _includeNullValues;
	        return _this;
	    }
	    Object.defineProperty(RangeFilter.prototype, "minValue", {
	        get: function () {
	            return this._min;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeFilter.prototype, "maxValue", {
	        get: function () {
	            return this._max;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeFilter.prototype, "includeNullValues", {
	        get: function () {
	            return this._includeNullValues;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RangeFilter.prototype.getDomainAsync = function (domainType) {
	        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
	        if (!domainType) {
	            domainType = Contract.FilterDomainType.Relevant;
	        }
	        return service.getRangeDomainAsync(this._worksheetName, this._fieldId, domainType);
	    };
	    return RangeFilter;
	}(Filter));
	exports.RangeFilter = RangeFilter;
	var RelativeDateFilter = (function (_super) {
	    __extends(RelativeDateFilter, _super);
	    function RelativeDateFilter(worksheetName, fieldName, fieldId, filterType, _anchorDate, _periodType, _rangeType, _rangeN) {
	        var _this = _super.call(this, worksheetName, fieldName, filterType, fieldId) || this;
	        _this._anchorDate = _anchorDate;
	        _this._periodType = _periodType;
	        _this._rangeType = _rangeType;
	        _this._rangeN = _rangeN;
	        return _this;
	    }
	    Object.defineProperty(RelativeDateFilter.prototype, "anchorDate", {
	        get: function () {
	            return this._anchorDate;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RelativeDateFilter.prototype, "periodType", {
	        get: function () {
	            return this._periodType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RelativeDateFilter.prototype, "rangeType", {
	        get: function () {
	            return this._rangeType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RelativeDateFilter.prototype, "rangeN", {
	        get: function () {
	            return this._rangeN;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return RelativeDateFilter;
	}(Filter));
	exports.RelativeDateFilter = RelativeDateFilter;
	var CategoricalDomain = (function () {
	    function CategoricalDomain(_values, _domainType) {
	        this._values = _values;
	        this._domainType = _domainType;
	    }
	    Object.defineProperty(CategoricalDomain.prototype, "values", {
	        get: function () {
	            return this._values;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CategoricalDomain.prototype, "type", {
	        get: function () {
	            return this._domainType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CategoricalDomain;
	}());
	exports.CategoricalDomain = CategoricalDomain;
	var RangeDomain = (function () {
	    function RangeDomain(_min, _max, _domainType) {
	        this._min = _min;
	        this._max = _max;
	        this._domainType = _domainType;
	    }
	    Object.defineProperty(RangeDomain.prototype, "type", {
	        get: function () {
	            return this._domainType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeDomain.prototype, "min", {
	        get: function () {
	            return this._min;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RangeDomain.prototype, "max", {
	        get: function () {
	            return this._max;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return RangeDomain;
	}());
	exports.RangeDomain = RangeDomain;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_utils_1 = __webpack_require__(10);
	var ServiceRegistryImpl = (function () {
	    function ServiceRegistryImpl() {
	        this._services = {};
	    }
	    ServiceRegistryImpl.prototype.registerService = function (service) {
	        this._services[service.serviceName] = service;
	    };
	    ServiceRegistryImpl.prototype.getService = function (serviceName) {
	        if (!this._services.hasOwnProperty(serviceName)) {
	            throw api_utils_1.TableauException.error(ServiceRegistryImpl.SERVICE_NOT_REGISTERED, [serviceName]);
	        }
	        return this._services[serviceName];
	    };
	    ServiceRegistryImpl.SERVICE_NOT_REGISTERED = 'No Service %1 is registered';
	    return ServiceRegistryImpl;
	}());
	/**
	 * static class used for getting access to the single instance
	 * of the ApiServiceRegistry
	 */
	var ApiServiceRegistry = (function () {
	    // Private to avoid anyone constructing this
	    function ApiServiceRegistry() {
	    }
	    Object.defineProperty(ApiServiceRegistry, "instance", {
	        /**
	         * Gets the singleton instance of the ServiceRegistry
	         */
	        get: function () {
	            if (!window.__tableauApiServiceRegistry) {
	                ApiServiceRegistry.setInstance(new ServiceRegistryImpl());
	            }
	            if (!window.__tableauApiServiceRegistry) {
	                throw api_utils_1.TableauException.error(ApiServiceRegistry.SERVICE_REGISTRY_FAILED);
	            }
	            return window.__tableauApiServiceRegistry;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Helper method to override the registry instance. Can be used by unit tests
	     *
	     * @param {ServiceRegistry} serviceRegistry The new registry
	     */
	    ApiServiceRegistry.setInstance = function (serviceRegistry) {
	        window.__tableauApiServiceRegistry = serviceRegistry;
	    };
	    ApiServiceRegistry.SERVICE_REGISTRY_FAILED = 'Assigning service registry failed';
	    return ApiServiceRegistry;
	}());
	exports.ApiServiceRegistry = ApiServiceRegistry;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var GetDataModels_1 = __webpack_require__(17);
	var GetDataService_1 = __webpack_require__(27);
	var GetDataServiceImpl = (function () {
	    function GetDataServiceImpl(dispatcher) {
	        this._dispatcher = dispatcher;
	    }
	    Object.defineProperty(GetDataServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "get-data-service" /* GetData */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GetDataServiceImpl.prototype.getUnderlyingDataAsync = function (visualId, getType, ignoreAliases, ignoreSelection, includeAllColumns, maxRows) {
	        var _this = this;
	        // Create all of our parameters
	        var verb = getType === GetDataService_1.GetDataType.Summary ? api_internal_contract_1.VerbId.GetDataSummaryData : api_internal_contract_1.VerbId.GetUnderlyingData;
	        var parameters = {};
	        parameters[api_internal_contract_1.ParameterId.VisualId] = visualId;
	        parameters[api_internal_contract_1.ParameterId.IgnoreAliases] = ignoreAliases;
	        parameters[api_internal_contract_1.ParameterId.IgnoreSelection] = ignoreSelection;
	        parameters[api_internal_contract_1.ParameterId.IncludeAllColumns] = includeAllColumns;
	        parameters[api_internal_contract_1.ParameterId.MaxRows] = maxRows;
	        return this._dispatcher.execute(verb, parameters).then(function (response) {
	            var responseData = response.result;
	            return _this.processResultsTable(responseData.data, responseData.isSummary);
	        });
	    };
	    GetDataServiceImpl.prototype.getSelectedMarksAsync = function (visualId) {
	        var _this = this;
	        var parameters = (_a = {}, _a[api_internal_contract_1.ParameterId.VisualId] = visualId, _a);
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.GetSelectedMarks, parameters).then(function (response) {
	            var responseData = response.result;
	            return {
	                data: responseData.data.map(function (table) { return _this.processResultsTable(table, true); })
	            };
	        });
	        var _a;
	    };
	    GetDataServiceImpl.prototype.getHighlightedMarksAsync = function (visualId) {
	        var _this = this;
	        var parameters = (_a = {}, _a[api_internal_contract_1.ParameterId.VisualId] = visualId, _a);
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.GetHighlightedMarks, parameters).then(function (response) {
	            var responseData = response.result;
	            return {
	                data: responseData.data.map(function (table) { return _this.processResultsTable(table, true); })
	            };
	        });
	        var _a;
	    };
	    GetDataServiceImpl.prototype.getDataSourceDataAsync = function (dataSourceId, ignoreAliases, maxRows, columnsToInclude) {
	        var _this = this;
	        var parameters = (_a = {},
	            _a[api_internal_contract_1.ParameterId.DataSourceId] = dataSourceId,
	            _a[api_internal_contract_1.ParameterId.IgnoreAliases] = ignoreAliases,
	            _a[api_internal_contract_1.ParameterId.MaxRows] = maxRows,
	            _a[api_internal_contract_1.ParameterId.ColumnsToInclude] = columnsToInclude,
	            _a);
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.GetDataSourceData, parameters).then(function (response) {
	            var responseData = response.result;
	            return _this.processResultsTable(responseData.data, false);
	        });
	        var _a;
	    };
	    GetDataServiceImpl.prototype.processResultsTable = function (responseData, isSummary) {
	        var headers = responseData.headers.map(function (h) { return new GetDataModels_1.Column(h.fieldCaption, Contract.DataType.String /*h.DataType*/, h.isReferenced, h.index); });
	        // TODO This should be controlled by a flag indicating whether this api will respond marks info or not
	        var marks;
	        if (responseData.marks) {
	            marks = responseData.marks.map(function (h) { return new GetDataModels_1.MarkInfo(h.type, h.color, h.tupleId); });
	        }
	        var table = responseData.dataTable.map(function (row) {
	            return row.map(function (cell) {
	                return new GetDataModels_1.DataValue(cell.value, cell.formattedValue);
	            });
	        });
	        if (marks) {
	            return new GetDataModels_1.DataTable(table, headers, table.length, isSummary, marks);
	        }
	        return new GetDataModels_1.DataTable(table, headers, table.length, isSummary);
	    };
	    return GetDataServiceImpl;
	}());
	exports.GetDataServiceImpl = GetDataServiceImpl;


/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Registration = (function () {
	    function Registration(_filterFn, _callbackFn) {
	        this._filterFn = _filterFn;
	        this._callbackFn = _callbackFn;
	        // Nothing Here
	    }
	    Registration.prototype.onNotification = function (notificationModel) {
	        if (this._filterFn(notificationModel)) {
	            this._callbackFn(notificationModel);
	        }
	    };
	    return Registration;
	}());
	var NotificationServiceImpl = (function () {
	    function NotificationServiceImpl(dispatcher) {
	        this.dispatcher = dispatcher;
	        this._handlers = {};
	        this.dispatcher.registerNotificationHandler(this.onNotification.bind(this));
	    }
	    Object.defineProperty(NotificationServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "notification-service" /* Notification */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    NotificationServiceImpl.prototype.registerHandler = function (id, filterFn, handler) {
	        var _this = this;
	        var handlers = this._handlers[id] || new Array();
	        var registration = new Registration(filterFn, handler);
	        handlers.push(registration);
	        this._handlers[id] = handlers;
	        return function () { return _this.removeRegistration(id, registration); };
	    };
	    NotificationServiceImpl.prototype.hasHandlersForNotificationType = function (id) {
	        return this._handlers.hasOwnProperty(id);
	    };
	    NotificationServiceImpl.prototype.onNotification = function (notification) {
	        if (!this.hasHandlersForNotificationType(notification.notificationId)) {
	            return;
	        }
	        // Go through and check for all the handlers of this particular notification
	        this._handlers[notification.notificationId].forEach(function (h) { return h.onNotification(notification.data); });
	    };
	    NotificationServiceImpl.prototype.removeRegistration = function (id, registration) {
	        if (!this.hasHandlersForNotificationType(id)) {
	            return;
	        }
	        this._handlers[id] = this._handlers[id].filter(function (reg) { return reg !== registration; });
	    };
	    return NotificationServiceImpl;
	}());
	exports.NotificationServiceImpl = NotificationServiceImpl;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	var ParameterImpl_1 = __webpack_require__(39);
	var Parameter_1 = __webpack_require__(14);
	var ParametersServiceImpl = (function () {
	    function ParametersServiceImpl(dispatcher) {
	        this.dispatcher = dispatcher;
	    }
	    Object.defineProperty(ParametersServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "parameters-service" /* Parameters */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ParametersServiceImpl.prototype.getParametersForSheetAsync = function (sheetPath, sheet) {
	        var parameters = (_a = {},
	            _a[api_internal_contract_1.ParameterId.SheetPath] = sheetPath,
	            _a);
	        return this.dispatcher.execute(api_internal_contract_1.VerbId.GetParametersForSheet, parameters).then(function (response) {
	            // TODO - Check for error
	            var result = response.result;
	            return result.map(function (parameterInfo) {
	                var impl = new ParameterImpl_1.ParameterImpl(parameterInfo);
	                return new Parameter_1.Parameter(impl, sheet);
	            });
	        });
	        var _a;
	    };
	    ParametersServiceImpl.prototype.changeParameterValueAsync = function (fieldName, newValue) {
	        var parameters = (_a = {},
	            _a[api_internal_contract_1.ParameterId.ParameterFieldName] = fieldName,
	            _a[api_internal_contract_1.ParameterId.ParameterValue] = newValue,
	            _a);
	        return this.dispatcher.execute(api_internal_contract_1.VerbId.ChangeParameterValue, parameters).then(function (response) {
	            var result = response.result;
	            return result;
	        });
	        var _a;
	    };
	    ParametersServiceImpl.prototype.findParameterByNameAsync = function (name, sheet) {
	        return this.findParameterAsync(sheet, name, undefined);
	    };
	    ParametersServiceImpl.prototype.findParameterByGlobalFieldNameAsync = function (fieldName, sheet) {
	        return this.findParameterAsync(sheet, undefined, fieldName);
	    };
	    ParametersServiceImpl.prototype.findParameterAsync = function (sheet, name, fieldName) {
	        var parameters = {};
	        if (name !== undefined) {
	            parameters[api_internal_contract_1.ParameterId.ParameterCaption] = name;
	        }
	        else if (fieldName !== undefined) {
	            parameters[api_internal_contract_1.ParameterId.ParameterFieldName] = fieldName;
	        }
	        else {
	            throw api_utils_1.TableauException.missingParameter(['field name or caption']);
	        }
	        return this.dispatcher.execute(api_internal_contract_1.VerbId.FindParameter, parameters).then(function (response) {
	            var instanceOfParameterInfo = function (object) {
	                return 'fieldName' in object;
	            };
	            // We need to check to see if we got a valid response back again
	            if (instanceOfParameterInfo(response.result)) {
	                var result = response.result;
	                var impl = new ParameterImpl_1.ParameterImpl(result);
	                return new Parameter_1.Parameter(impl, sheet);
	            }
	            else {
	                return undefined;
	            }
	        });
	    };
	    return ParametersServiceImpl;
	}());
	exports.ParametersServiceImpl = ParametersServiceImpl;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	var InternalToExternalEnumMappings_1 = __webpack_require__(33);
	var ParameterChangedEvent_1 = __webpack_require__(40);
	var GetDataModels_1 = __webpack_require__(17);
	var ServiceRegistry_1 = __webpack_require__(35);
	var SingleEventManagerImpl_1 = __webpack_require__(26);
	var ParameterImpl = (function () {
	    function ParameterImpl(parameterInfo) {
	        this.setParameterInfo(parameterInfo);
	    }
	    Object.defineProperty(ParameterImpl.prototype, "name", {
	        get: function () {
	            return this._parameterInfo.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ParameterImpl.prototype, "currentValue", {
	        get: function () {
	            return new GetDataModels_1.DataValue(this._parameterInfo.currentValue.value, this._parameterInfo.currentValue.formattedValue);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ParameterImpl.prototype, "dataType", {
	        get: function () {
	            return InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.dataType.convert(this._parameterInfo.dataType);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ParameterImpl.prototype, "id", {
	        get: function () {
	            return this._globalFieldName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ParameterImpl.prototype, "allowableValues", {
	        get: function () {
	            return this._allowableValues;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ParameterImpl.prototype.changeValueAsync = function (newValue) {
	        var _this = this;
	        var coercedValue = api_utils_1.Param.serializeParamterValue(newValue);
	        var parametersService = ServiceRegistry_1.ApiServiceRegistry.instance.getService("parameters-service" /* Parameters */);
	        return parametersService.changeParameterValueAsync(this._globalFieldName, coercedValue).then(function (parameterInfo) {
	            _this.setParameterInfo(parameterInfo);
	            return _this.currentValue;
	        });
	    };
	    /**
	     * Helper method which goes through and registers each event type this impl knows about
	     * with the NotificationService. It returns an array of SingleEventManager objects which
	     * can then be passed to an EventListenerManager to handle user registration / unregistration.
	     *
	     * @param sheet The sheet object which will be included with the event notifications
	     * @returns {Array<SingleEventManager>} Collection of event managers to pass to an EventListenerManager
	     */
	    ParameterImpl.prototype.initializeEvents = function (sheet) {
	        var _this = this;
	        var results = new Array();
	        var notificationService;
	        try {
	            notificationService = ServiceRegistry_1.ApiServiceRegistry.instance.getService("notification-service" /* Notification */);
	        }
	        catch (e) {
	            // If we don't have this service registered, just return
	            return results;
	        }
	        // Initialize all of the event managers we'll need (one for each event type)
	        var parameterEvent = new SingleEventManagerImpl_1.SingleEventManagerImpl(Contract.TableauEventType.ParameterChanged);
	        notificationService.registerHandler(api_internal_contract_1.NotificationId.ParameterChanged, function (model) {
	            var fieldName = model;
	            return fieldName === _this._globalFieldName;
	        }, function (fieldName) {
	            parameterEvent.triggerEvent(function () { return new ParameterChangedEvent_1.ParameterChangedEvent(fieldName, sheet); });
	        });
	        results.push(parameterEvent);
	        return results;
	    };
	    ParameterImpl.prototype.setParameterInfo = function (parameterInfo) {
	        this._parameterInfo = parameterInfo;
	        this._globalFieldName = parameterInfo.fieldName;
	        var type = InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.allowableValues.convert(parameterInfo.allowableValuesType);
	        var listValues;
	        var minValue;
	        var maxValue;
	        var stepSize;
	        var dateStepPeriod;
	        if (type === Contract.ParameterValueType.List) {
	            var values = parameterInfo.allowableValues || [];
	            listValues = values.map(function (val) { return new GetDataModels_1.DataValue(val.value, val.formattedValue); });
	        }
	        else if (type === Contract.ParameterValueType.Range) {
	            minValue = parameterInfo.minValue && new GetDataModels_1.DataValue(parameterInfo.minValue.value, parameterInfo.minValue.formattedValue);
	            maxValue = parameterInfo.maxValue && new GetDataModels_1.DataValue(parameterInfo.maxValue.value, parameterInfo.maxValue.formattedValue);
	            stepSize = parameterInfo.stepSize;
	            dateStepPeriod = parameterInfo.dateStepPeriod &&
	                InternalToExternalEnumMappings_1.InternalToExternalEnumMappings.dateStepPeriod.convert(parameterInfo.dateStepPeriod);
	        }
	        this._allowableValues = {
	            type: type,
	            allowableValues: listValues,
	            minValue: minValue,
	            maxValue: maxValue,
	            stepSize: stepSize,
	            dateStepPeriod: dateStepPeriod
	        };
	    };
	    return ParameterImpl;
	}());
	exports.ParameterImpl = ParameterImpl;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var api_utils_1 = __webpack_require__(10);
	var ServiceRegistry_1 = __webpack_require__(35);
	var TableauSheetEvent_1 = __webpack_require__(23);
	var ParameterChangedEvent = (function (_super) {
	    __extends(ParameterChangedEvent, _super);
	    function ParameterChangedEvent(_globalFieldName, sheet) {
	        var _this = _super.call(this, Contract.TableauEventType.ParameterChanged, sheet) || this;
	        _this._globalFieldName = _globalFieldName;
	        return _this;
	    }
	    ParameterChangedEvent.prototype.getParameterAsync = function () {
	        // Call down to our service to get the parameter back via its field name
	        var service = ServiceRegistry_1.ApiServiceRegistry.instance.getService("parameters-service" /* Parameters */);
	        return service.findParameterByGlobalFieldNameAsync(this._globalFieldName, this.sheet).then(function (parameter) {
	            if (parameter === undefined) {
	                throw api_utils_1.TableauException.error(ParameterChangedEvent.PARAM_NOT_FOUND);
	            }
	            return parameter;
	        });
	    };
	    ParameterChangedEvent.PARAM_NOT_FOUND = 'Unable to find parameter';
	    return ParameterChangedEvent;
	}(TableauSheetEvent_1.TableauSheetEvent));
	exports.ParameterChangedEvent = ParameterChangedEvent;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(20);
	var api_internal_contract_1 = __webpack_require__(30);
	var api_utils_1 = __webpack_require__(10);
	var SelectionModels_1 = __webpack_require__(42);
	var SelectionServiceImpl = (function () {
	    function SelectionServiceImpl(dispatcher) {
	        this._dispatcher = dispatcher;
	    }
	    Object.defineProperty(SelectionServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "selection-service" /* Selection */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Method to clear all the selected marks for the given worksheet.
	     *
	     * @param visualId
	     */
	    SelectionServiceImpl.prototype.clearSelectedMarksAsync = function (visualId) {
	        var parameters = (_a = {}, _a[api_internal_contract_1.ParameterId.VisualId] = visualId, _a);
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.ClearSelectedMarks, parameters).then(function (response) {
	            return; // Expecting an empty model and hence the void response.
	        });
	        var _a;
	    };
	    /**
	     * Method to select marks for the given worksheet.
	     *
	     * @param visualId
	     * @param selectionCriteria
	     * @param selectionUpdateType
	     */
	    SelectionServiceImpl.prototype.selectMarksByValueAsync = function (visualId, selectionCriterias, selectionUpdateType) {
	        if (selectionCriterias.length === 0) {
	            throw api_utils_1.TableauException.invalid(['Selection criteria', 'Selections missing.']);
	        }
	        var selectionType = this.validateSelectionUpdateType(selectionUpdateType);
	        var selectionCriteriaType = this.validateSelectionCriteria(selectionCriterias[0]);
	        var selectionModelContainer = this.parseSelectionMarks(selectionCriterias, selectionCriteriaType);
	        var parameters = (_a = {},
	            _a[api_internal_contract_1.ParameterId.VisualId] = visualId,
	            _a[api_internal_contract_1.ParameterId.SelectionUpdateType] = selectionType,
	            _a);
	        switch (selectionCriteriaType) {
	            case SelectionCriteriaType.HierarchicalType: {
	                parameters[api_internal_contract_1.ParameterId.HierValSelectionModels] = selectionModelContainer.hierModelArr;
	                break;
	            }
	            case SelectionCriteriaType.RangeType: {
	                parameters[api_internal_contract_1.ParameterId.QuantRangeSelectionModels] = selectionModelContainer.quantModelArr;
	                break;
	            }
	            case SelectionCriteriaType.DimensionType: {
	                parameters[api_internal_contract_1.ParameterId.DimValSelectionModels] = selectionModelContainer.dimModelArr;
	                break;
	            }
	            default:
	                break;
	        }
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.SelectByValue, parameters).then(function (response) {
	            // Expecting an empty model and hence the void response.
	            return;
	            // TODO Investigate the error response with multiple output params and throw error accordingly.
	        });
	        var _a;
	    };
	    /**
	   * Method to select marks for the given worksheet.
	   *
	   * @param visualId
	   * @param MarkInfo
	   * @param selectionUpdateType
	   */
	    SelectionServiceImpl.prototype.selectMarksByIdAsync = function (visualId, marks, selectionUpdateType) {
	        if (marks.length === 0) {
	            throw api_utils_1.TableauException.invalid(['Selection', 'Marks info missing.']);
	        }
	        var selectionType = this.validateSelectionUpdateType(selectionUpdateType);
	        var selectionModelContainer = this.parseSelectionIds(marks);
	        var parameters = (_a = {},
	            _a[api_internal_contract_1.ParameterId.VisualId] = visualId,
	            _a[api_internal_contract_1.ParameterId.SelectionUpdateType] = selectionType,
	            _a[api_internal_contract_1.ParameterId.Selection] = selectionModelContainer.selection,
	            _a);
	        return this._dispatcher.execute(api_internal_contract_1.VerbId.SelectByValue, parameters).then(function (response) {
	            // Expecting an empty model and hence the void response.
	            return;
	            // TODO Investigate the error response with multiple output params and throw error accordingly.
	        });
	        var _a;
	    };
	    /**
	     * Method to prepare the pres models for selection by MarksInfo
	     * @param marks
	     */
	    SelectionServiceImpl.prototype.parseSelectionIds = function (marks) {
	        var ids = [];
	        var selectionModelContainer = new SelectionModels_1.SelectionModelsContainer();
	        for (var i = 0; i < marks.length; i++) {
	            var tupleId = marks[i].tupleId;
	            if (tupleId !== undefined && tupleId !== null) {
	                ids.push(tupleId.toString()); // collect the tuple ids
	            }
	            else {
	                throw api_utils_1.TableauException.invalid(['tupleId']);
	            }
	        }
	        if (ids.length !== 0) {
	            var tupleSelectionModel = new SelectionModels_1.TupleSelectionModel();
	            tupleSelectionModel.selectionType = 'tuples';
	            tupleSelectionModel.objectIds = ids;
	            selectionModelContainer.selection = tupleSelectionModel;
	        }
	        return selectionModelContainer;
	    };
	    /**
	     * Method to prepare the pres models for selection by values.
	     *
	     * Supports 3 types for selection:
	     * 1) hierarchical value based selection
	     * 2) range value based selection
	     * 3) Dimension value based selection
	     *
	     * @param marks
	     * @param hierModelArr
	     * @param dimModelArr
	     * @param quantModelArr
	     * @param selection
	     */
	    SelectionServiceImpl.prototype.parseSelectionMarks = function (selectionCriterias, selectionType) {
	        var selectionModelContainer = new SelectionModels_1.SelectionModelsContainer();
	        var mixedSelectionsError = false;
	        for (var i = 0; i < selectionCriterias.length; i++) {
	            var st = selectionCriterias[i];
	            if (st.fieldName && (st.value !== undefined && st.value !== null)) {
	                var catRegex = new RegExp('(\[[A-Za-z0-9]+]).*', 'g');
	                var rangeOption = st.value;
	                if (catRegex.test(st.fieldName)) {
	                    if (selectionType === SelectionCriteriaType.HierarchicalType) {
	                        var hierModel = this.addToParamsList(st.fieldName, st.value);
	                        selectionModelContainer.hierModelArr.push(hierModel);
	                    }
	                    else {
	                        mixedSelectionsError = true;
	                        break;
	                    }
	                }
	                else if (rangeOption.min !== undefined
	                    && rangeOption.max !== undefined) {
	                    if (selectionType === SelectionCriteriaType.RangeType) {
	                        var quantModel = this.addToRangeParamsList(st.fieldName, rangeOption);
	                        selectionModelContainer.quantModelArr.push(quantModel);
	                    }
	                    else {
	                        mixedSelectionsError = true;
	                        break;
	                    }
	                }
	                else {
	                    if (selectionType === SelectionCriteriaType.DimensionType) {
	                        var dimModel = this.addToParamsList(st.fieldName, st.value);
	                        selectionModelContainer.dimModelArr.push(dimModel);
	                    }
	                    else {
	                        mixedSelectionsError = true;
	                        break;
	                    }
	                }
	            }
	        }
	        if (mixedSelectionsError) {
	            throw api_utils_1.TableauException.invalid(['Selection Criteria', 'Different types of selection criterias provided.']);
	        }
	        return selectionModelContainer;
	    };
	    /**
	     *
	     * @param selectionCriterias Validate and determine the selection criterias type.
	     */
	    SelectionServiceImpl.prototype.validateSelectionCriteria = function (selectionCriteria) {
	        var selectionType;
	        // Determine the type of selection, this command is by looking at the first selection
	        var crit = selectionCriteria;
	        var catRegex = new RegExp('(\[[A-Za-z0-9]+]).*', 'g');
	        var rangeOption = crit.value;
	        if (crit.fieldName && (crit.value !== undefined && crit.value !== null)) {
	            if (catRegex.test(crit.fieldName)) {
	                selectionType = SelectionCriteriaType.HierarchicalType;
	            }
	            else if (rangeOption.min !== undefined
	                && rangeOption.max !== undefined) {
	                selectionType = SelectionCriteriaType.RangeType;
	            }
	            else {
	                selectionType = SelectionCriteriaType.DimensionType;
	            }
	        }
	        else {
	            throw api_utils_1.TableauException.invalid(['Selection', 'Criteria format.']);
	        }
	        return selectionType;
	    };
	    /**
	     * Method to transform the key value pair into value based pres model object.
	     *
	     * @param valueSelectionModel
	     * @param fieldName
	     * @param value
	     */
	    SelectionServiceImpl.prototype.addToParamsList = function (fieldName, value) {
	        var valueSelectionModel = new SelectionModels_1.ValueSelectionModel();
	        var markValues = [];
	        if (value instanceof Array) {
	            var valueArr = value;
	            for (var i = 0; i < valueArr.length; i++) {
	                markValues.push(valueArr[i].toString());
	            }
	        }
	        else {
	            markValues.push(value.toString());
	        }
	        valueSelectionModel.qualifiedFieldCaption = fieldName;
	        valueSelectionModel.selectValues = markValues;
	        return valueSelectionModel;
	    };
	    /**
	     * Method to transform the key value pair into range based selection pres model.
	     *
	     * TODO: Need to handle the parsing of date type values.
	     *
	     * @param valueSelectionModel
	     * @param fieldName
	     * @param value
	     */
	    SelectionServiceImpl.prototype.addToRangeParamsList = function (fieldName, value) {
	        var rangeSelectionModel = new SelectionModels_1.RangeSelectionModel();
	        rangeSelectionModel.qualifiedFieldCaption = fieldName;
	        if (value.max !== undefined && value.max !== null) {
	            rangeSelectionModel.maxValue = value.max.toString();
	        }
	        if (value.min !== undefined && value.min !== null) {
	            rangeSelectionModel.minValue = value.min.toString();
	        }
	        rangeSelectionModel.included = this.validateNullOptionType(value.nullOption);
	        return rangeSelectionModel;
	    };
	    /**
	     * Method to validate the selection update type.
	     *
	     * @param selectionUpdateType
	     */
	    SelectionServiceImpl.prototype.validateSelectionUpdateType = function (selectionUpdateType) {
	        if (selectionUpdateType === Contract.SelectionUpdateType.Replace) {
	            return api_internal_contract_1.SelectionUpdateType.Replace;
	        }
	        else if (selectionUpdateType === Contract.SelectionUpdateType.Add) {
	            return api_internal_contract_1.SelectionUpdateType.Add;
	        }
	        else if (selectionUpdateType === Contract.SelectionUpdateType.Remove) {
	            return api_internal_contract_1.SelectionUpdateType.Remove;
	        }
	        return api_internal_contract_1.SelectionUpdateType.Replace;
	    };
	    /**
	     * Method to validate the include type for range selection.
	     *
	     * @param nullOption
	     */
	    SelectionServiceImpl.prototype.validateNullOptionType = function (nullOption) {
	        if (nullOption) {
	            if (nullOption === Contract.FilterNullOption.NullValues) {
	                return api_internal_contract_1.QuantitativeIncludedValues.IncludeNull;
	            }
	            else if (nullOption === Contract.FilterNullOption.NonNullValues) {
	                return api_internal_contract_1.QuantitativeIncludedValues.IncludeNonNull;
	            }
	            else if (nullOption === Contract.FilterNullOption.AllValues) {
	                return api_internal_contract_1.QuantitativeIncludedValues.IncludeAll;
	            }
	        }
	        return api_internal_contract_1.QuantitativeIncludedValues.IncludeAll;
	    };
	    return SelectionServiceImpl;
	}());
	exports.SelectionServiceImpl = SelectionServiceImpl;
	/**
	 * Enum for the different selection criteria types.
	 */
	var SelectionCriteriaType;
	(function (SelectionCriteriaType) {
	    SelectionCriteriaType[SelectionCriteriaType["HierarchicalType"] = 1] = "HierarchicalType";
	    SelectionCriteriaType[SelectionCriteriaType["RangeType"] = 2] = "RangeType";
	    SelectionCriteriaType[SelectionCriteriaType["DimensionType"] = 3] = "DimensionType";
	    SelectionCriteriaType[SelectionCriteriaType["TuplesType"] = 4] = "TuplesType";
	})(SelectionCriteriaType || (SelectionCriteriaType = {}));


/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Selection Model.
	 */
	var SelectionModel = (function () {
	    function SelectionModel() {
	    }
	    return SelectionModel;
	}());
	exports.SelectionModel = SelectionModel;
	/**
	 * Value based selection model. Meant for hierarchical, range and categorical selections.
	 */
	var ValueSelectionModel = (function (_super) {
	    __extends(ValueSelectionModel, _super);
	    function ValueSelectionModel() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.selectValues = [];
	        return _this;
	    }
	    return ValueSelectionModel;
	}(SelectionModel));
	exports.ValueSelectionModel = ValueSelectionModel;
	/**
	 * Hierarchical value selection model
	 */
	var HierarchicalSelectionModel = (function (_super) {
	    __extends(HierarchicalSelectionModel, _super);
	    function HierarchicalSelectionModel() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return HierarchicalSelectionModel;
	}(ValueSelectionModel));
	exports.HierarchicalSelectionModel = HierarchicalSelectionModel;
	/**
	 * Range based value selection model
	 */
	var RangeSelectionModel = (function (_super) {
	    __extends(RangeSelectionModel, _super);
	    function RangeSelectionModel() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return RangeSelectionModel;
	}(SelectionModel));
	exports.RangeSelectionModel = RangeSelectionModel;
	/**
	 * Dimension value selection model
	 */
	var DimensionSelectionModel = (function (_super) {
	    __extends(DimensionSelectionModel, _super);
	    function DimensionSelectionModel() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return DimensionSelectionModel;
	}(ValueSelectionModel));
	exports.DimensionSelectionModel = DimensionSelectionModel;
	/**
	 * Tuple based selection model
	 */
	var TupleSelectionModel = (function () {
	    function TupleSelectionModel() {
	        this.objectIds = [];
	    }
	    return TupleSelectionModel;
	}());
	exports.TupleSelectionModel = TupleSelectionModel;
	/**
	 * Container class to populate all the selection models when parsing input
	 */
	var SelectionModelsContainer = (function () {
	    function SelectionModelsContainer() {
	        this.hierModelArr = [];
	        this.dimModelArr = [];
	        this.quantModelArr = [];
	    }
	    return SelectionModelsContainer;
	}());
	exports.SelectionModelsContainer = SelectionModelsContainer;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_messaging_1 = __webpack_require__(44);
	var CrossFrameDispatcher_1 = __webpack_require__(50);
	// Checks to see if we are running in an iframe currently: https://stackoverflow.com/a/326076/8821153
	function inIframe(thisWindow) {
	    try {
	        return thisWindow.self !== thisWindow.parent;
	    }
	    catch (e) {
	        return true;
	    }
	}
	/**
	 * Attempts to bootstrap the extension with a cross-frame parent where Tableau is running
	 *
	 * @param thisWindow The window which we are running in (injected for unit testing purposes)
	 * @param versionNumber The version number of our API to include in the initialization message
	 * @returns A promise which is doing the actual bootstrapping
	 */
	function doCrossFrameBootstrap(thisWindow, versionNumber) {
	    return new Promise(function (resolve, reject) {
	        // Check to make sure we're in an iframe and have a parent to communicate with
	        if (!inIframe(thisWindow)) {
	            reject('This extension is not running inside an iframe or desktop. Initialization failed.');
	        }
	        // Create the messenger which will do he communication between this window and our parent
	        // Since we don't know where we are running yet, we have to make this initial origin '*'. Once
	        // we have successfully initialized our extension, we will limit where we send messages
	        var messenger = new api_messaging_1.CrossFrameMessenger(thisWindow, thisWindow.parent, '*');
	        // Prepare to send an initialization message to the parent frame
	        var initializationMessage = messenger.prepareInitializationMessage(versionNumber, api_messaging_1.VERSION);
	        // When we receive a response back from the parent, we check to make sure the guids match and then we know
	        // that the parent is aware of us and we can start communicating
	        messenger.setCommandResponseMessageHandler(function (msg) {
	            // Verify we are getting a response from our initialize message
	            if (msg.commandGuid === initializationMessage.messageGuid) {
	                var dispatcher = new CrossFrameDispatcher_1.CrossFrameDispatcher(messenger);
	                resolve(dispatcher);
	            }
	        });
	        // Now that our handlers are ready, start listening and send our initialization message
	        messenger.startListening();
	        initializationMessage.send();
	    });
	}
	exports.doCrossFrameBootstrap = doCrossFrameBootstrap;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(45));
	__export(__webpack_require__(48));
	// Export the version number of messaging for consumers to use.
	// Be very careful making any updates to this contract which break version compatibility.
	exports.VERSION = {
	    major: 1,
	    minor: 0,
	    fix: 0
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var guid_1 = __webpack_require__(46);
	var CrossFramePreparedMessage_1 = __webpack_require__(47);
	var MessageTypes_1 = __webpack_require__(48);
	var MessageTypeChecks_1 = __webpack_require__(49);
	/**
	 * The CrossFrameMessenger is the primary export from the api-messaging module. An instance of
	 * this class can be instantiated on both sides of a frame boundary to facilitate communication
	 * in both directions between the frames. This class implements both the dispatcher and the listener
	 * portions, but doesn't require callers to care about both.
	 */
	var CrossFrameMessenger = (function () {
	    /**
	     * Creates an instance of CrossFrameMessenger. If you would like to use the CrossFrameMessenger as a MessageListener,
	     * be sure to call StartListening and register message handlers.
	     * @param thisWindow The window object which the CrossFrameMessenger lives. An onMessage listener will be added here.
	     * @param [otherWindow] Optional otherWindow which messages will be posted to.
	     *                      If defined, incoming messages must originate from otherWindow to be passed on
	     * @param [otherWindowOrigin] The target origin which otherWindow must have in order to receive dispatched messages.
	     *                            This value will be sent as the targetOrigin of a postMessage
	     *                            (https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
	     */
	    function CrossFrameMessenger(thisWindow, otherWindow, otherWindowOrigin) {
	        this.thisWindow = thisWindow;
	        this.otherWindow = otherWindow;
	        this.otherWindowOrigin = otherWindowOrigin;
	        // Make sure to call StartListening
	    }
	    ///// MessageListener Implementation
	    CrossFrameMessenger.prototype.startListening = function () {
	        var _this = this;
	        // Check if we already are listening, if not, hook up a message listener
	        if (!this.unregisterFunction) {
	            var boundHandler_1 = this.onMessageReceived.bind(this);
	            this.thisWindow.addEventListener('message', boundHandler_1, true);
	            this.unregisterFunction = function () { return _this.thisWindow.removeEventListener('message', boundHandler_1, true); };
	        }
	    };
	    CrossFrameMessenger.prototype.stopListening = function () {
	        // Stop listening if we have started listening
	        if (this.unregisterFunction) {
	            this.unregisterFunction();
	            this.unregisterFunction = undefined;
	        }
	    };
	    CrossFrameMessenger.prototype.setInitializeMessageHandler = function (handler) {
	        this.initializeMessageHandler = handler;
	    };
	    CrossFrameMessenger.prototype.setCommandResponseMessageHandler = function (handler) {
	        this.commandResponseMessageHandler = handler;
	    };
	    CrossFrameMessenger.prototype.setCommandMessageHandler = function (handler) {
	        this.commandMessageHandler = handler;
	    };
	    CrossFrameMessenger.prototype.setNotificationMessageHandler = function (handler) {
	        this.notificationMessageHandler = handler;
	    };
	    ///// MessageDispatcher Implementation
	    CrossFrameMessenger.prototype.prepareInitializationMessage = function (apiVersion, crossFrameVersion) {
	        var message = {
	            msgGuid: guid_1.Guid.create().formattedValue,
	            msgType: MessageTypes_1.MessageType.Initialize,
	            crossFrameVersion: crossFrameVersion,
	            apiVersion: apiVersion
	        };
	        return this.prepareMessage(message);
	    };
	    CrossFrameMessenger.prototype.prepareCommandMessage = function (verbId, parameters) {
	        var message = {
	            msgGuid: guid_1.Guid.create().formattedValue,
	            msgType: MessageTypes_1.MessageType.Command,
	            verbId: verbId,
	            parameters: parameters
	        };
	        return this.prepareMessage(message);
	    };
	    CrossFrameMessenger.prototype.prepareCommandResponseMessage = function (commandGuid, data, error) {
	        var message = {
	            msgGuid: guid_1.Guid.create().formattedValue,
	            msgType: MessageTypes_1.MessageType.CommandResponse,
	            commandGuid: commandGuid,
	            data: data,
	            error: error
	        };
	        return this.prepareMessage(message);
	    };
	    CrossFrameMessenger.prototype.prepareNotificationMessage = function (notificationId, data) {
	        var message = {
	            msgGuid: guid_1.Guid.create().formattedValue,
	            msgType: MessageTypes_1.MessageType.Notification,
	            notificationId: notificationId,
	            data: data
	        };
	        return this.prepareMessage(message);
	    };
	    /**
	     * Prepares a pending message for sending and returns the prepared message
	     *
	     * @param msg The message to be sent to this.otherWindow
	     * @returns The prepared message
	     */
	    CrossFrameMessenger.prototype.prepareMessage = function (msg) {
	        if (!this.otherWindow || !this.otherWindowOrigin) {
	            throw 'Other window not initialized, cannot dispatch messages';
	        }
	        var preparedMessage = new CrossFramePreparedMessage_1.CrossFramePreparedMessage(msg, this.otherWindow, this.otherWindowOrigin);
	        return preparedMessage;
	    };
	    /**
	     * Called when a message is received. Does some validation of the message, and then
	     * calls an appropriate message handler if one is defined
	     *
	     * @param event The incoming MessageEvent
	     */
	    CrossFrameMessenger.prototype.onMessageReceived = function (event) {
	        // If we have an otherWindow defined, make sure the message is coming from there
	        if (this.otherWindow && event.source !== this.otherWindow) {
	            return;
	        }
	        // Do some validation on event.data to make sure that we have received a real message
	        if (!event.data) {
	            return;
	        }
	        var message = event.data;
	        if (!MessageTypeChecks_1.isMessage(message)) {
	            return;
	        }
	        // Check the declared message type, validate the message, and call an appropriate hander if one exists
	        switch (message.msgType) {
	            case MessageTypes_1.MessageType.Initialize: {
	                if (!MessageTypeChecks_1.isInitMessage(message) || !this.initializeMessageHandler) {
	                    return;
	                }
	                this.initializeMessageHandler(message, event.source);
	                break;
	            }
	            case MessageTypes_1.MessageType.CommandResponse: {
	                if (!MessageTypeChecks_1.isCommandResponseMessage(message) || !this.commandResponseMessageHandler) {
	                    return;
	                }
	                this.commandResponseMessageHandler(message, event.source);
	                break;
	            }
	            case MessageTypes_1.MessageType.Command: {
	                if (!MessageTypeChecks_1.isCommandMessage(message) || !this.commandMessageHandler) {
	                    return;
	                }
	                this.commandMessageHandler(message, event.source);
	                break;
	            }
	            case MessageTypes_1.MessageType.Notification: {
	                if (!MessageTypeChecks_1.isNotificationMessage(message) || !this.notificationMessageHandler) {
	                    return;
	                }
	                this.notificationMessageHandler(message, event.source);
	                break;
	            }
	            default:
	        }
	    };
	    return CrossFrameMessenger;
	}());
	exports.CrossFrameMessenger = CrossFrameMessenger;


/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var guidRegex = /^[a-f0-9]{8}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{12}$/i;
	var emptyGuidValue = '00000000-0000-0000-0000-000000000000';
	/**
	 * This is where the magic happens. Generates the specified number of GUID quads using a random number.
	 * @param count The number of quads to generate.
	 */
	function generateQuad(count) {
	    if (count === void 0) { count = 1; }
	    var out = '';
	    for (var i = 0; i < count; i++) {
	        // tslint:disable-next-line:no-bitwise
	        out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	    }
	    return out;
	}
	/**
	 * Represents a Globally Unique Identifier (GUID). This is not meant to be cryptographically secure.
	 */
	var Guid = (function () {
	    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    // Constructor
	    function Guid(value) {
	        this.value = value.toLowerCase();
	    }
	    Object.defineProperty(Guid.prototype, "formattedValue", {
	        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	        // Properties
	        /**
	         * Read-only formatted value of the GUID.
	         */
	        get: function () {
	            return this.value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Guid.prototype, "isEmpty", {
	        /**
	         * Returns a value indicating whether this GUID is empty (equal to Guid.EMPTY).
	         */
	        get: function () {
	            return this.value === emptyGuidValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	    // Methods
	    /**
	     * Returns a value indicating whether the value is a valid GUID.
	     * @param value Either a Guid instance or a string
	     */
	    Guid.isGuid = function (value) {
	        return (value instanceof Guid) || guidRegex.test(value);
	    };
	    /**
	     * Creates a new GUID.
	     */
	    Guid.create = function () {
	        return new Guid([generateQuad(2), generateQuad(), generateQuad(), generateQuad(), generateQuad(3)].join('-'));
	    };
	    /**
	     * Parses an existing GUID string. Throws a TypeError if the value is not a valid GUID.
	     * @param value the existing GUID string to parse
	     */
	    Guid.parse = function (value) {
	        if (!Guid.isGuid(value)) {
	            throw new TypeError("Value is not a valid GUID: '" + value + "'");
	        }
	        return new Guid(value);
	    };
	    /**
	     * Returns the formatted GUID.
	     */
	    Guid.prototype.toString = function () {
	        return this.value;
	    };
	    /**
	     * Returns a value indicating whether another GUID is equal to this GUID.
	     * @param other Either another Guid instance or a formatted GUID string.
	     */
	    Guid.prototype.equals = function (other) {
	        var otherGuid = (other instanceof Guid) ? other : Guid.parse(other);
	        return this.formattedValue === otherGuid.formattedValue;
	    };
	    /**
	     * Represents a placeholder GUID or a value to represent a non-GUID.
	     * Returns '00000000-0000-0000-0000-000000000000'.
	     */
	    Guid.EMPTY = new Guid(emptyGuidValue);
	    return Guid;
	}());
	exports.Guid = Guid;


/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Implementation of the PreparedMessage interface used to post messages between
	 * two frames using window.postMessage
	 */
	var CrossFramePreparedMessage = (function () {
	    /**
	     * Creates an instance of CrossFramePreparedMessage.
	     * @param _message The message to be sent
	     * @param _target The target window where the message will be sent
	     * @param _origin The targetOrigin where this message can be received
	     */
	    function CrossFramePreparedMessage(_message, _target, _origin) {
	        this._message = _message;
	        this._target = _target;
	        this._origin = _origin;
	    }
	    Object.defineProperty(CrossFramePreparedMessage.prototype, "messageGuid", {
	        get: function () { return this._message.msgGuid; },
	        enumerable: true,
	        configurable: true
	    });
	    CrossFramePreparedMessage.prototype.send = function () {
	        this._target.postMessage(this._message, this._origin);
	        return this;
	    };
	    return CrossFramePreparedMessage;
	}());
	exports.CrossFramePreparedMessage = CrossFramePreparedMessage;


/***/ },
/* 48 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Enum defining the 4 different types of messages we have defined
	 */
	var MessageType;
	(function (MessageType) {
	    MessageType["Initialize"] = "initialize";
	    MessageType["Notification"] = "notification";
	    MessageType["Command"] = "command";
	    MessageType["CommandResponse"] = "command-response";
	})(MessageType = exports.MessageType || (exports.MessageType = {}));


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var guid_1 = __webpack_require__(46);
	var MessageTypes_1 = __webpack_require__(48);
	/* tslint:disable no-any */
	function isMessage(data) {
	    if (!data) {
	        return false;
	    }
	    var message = data;
	    if (!message || !message.msgGuid || !message.msgType) {
	        return false;
	    }
	    if (!guid_1.Guid.isGuid(message.msgGuid)) {
	        return false;
	    }
	    if (typeof message.msgType !== 'string') {
	        return false;
	    }
	    var messageTypes = [MessageTypes_1.MessageType.Command, MessageTypes_1.MessageType.CommandResponse, MessageTypes_1.MessageType.Initialize, MessageTypes_1.MessageType.Notification];
	    if (messageTypes.indexOf(message.msgType) < 0) {
	        return false;
	    }
	    return true;
	}
	exports.isMessage = isMessage;
	function isVersion(versionNumber) {
	    if (!versionNumber) {
	        return false;
	    }
	    var v = versionNumber;
	    if (typeof v !== 'object') {
	        return false;
	    }
	    if (typeof v.fix !== 'number' || typeof v.minor !== 'number' || typeof v.major !== 'number') {
	        return false;
	    }
	    return true;
	}
	exports.isVersion = isVersion;
	function isInitMessage(message) {
	    if (!isMessage(message)) {
	        return false;
	    }
	    var initMessage = message;
	    if (initMessage.msgType !== MessageTypes_1.MessageType.Initialize) {
	        return false;
	    }
	    if (!initMessage.apiVersion || !isVersion(initMessage.apiVersion)) {
	        return false;
	    }
	    if (!initMessage.crossFrameVersion || !isVersion(initMessage.crossFrameVersion)) {
	        return false;
	    }
	    return true;
	}
	exports.isInitMessage = isInitMessage;
	function isCommandResponseMessage(message) {
	    if (!isMessage(message)) {
	        return false;
	    }
	    var crMessage = message;
	    if (crMessage.msgType !== MessageTypes_1.MessageType.CommandResponse) {
	        return false;
	    }
	    if (!guid_1.Guid.isGuid(crMessage.commandGuid)) {
	        return false;
	    }
	    if (!crMessage.data && !crMessage.error) {
	        return false;
	    }
	    return true;
	}
	exports.isCommandResponseMessage = isCommandResponseMessage;
	function isCommandMessage(message) {
	    if (!isMessage(message)) {
	        return false;
	    }
	    var commandMessage = message;
	    if (commandMessage.msgType !== MessageTypes_1.MessageType.Command) {
	        return false;
	    }
	    if (!commandMessage.parameters || typeof commandMessage.parameters !== 'object') {
	        return false;
	    }
	    if (!commandMessage.verbId || typeof commandMessage.verbId !== 'string') {
	        return false;
	    }
	    return true;
	}
	exports.isCommandMessage = isCommandMessage;
	function isNotificationMessage(message) {
	    if (!isMessage(message)) {
	        return false;
	    }
	    var notificationMessage = message;
	    if (notificationMessage.msgType !== MessageTypes_1.MessageType.Notification) {
	        return false;
	    }
	    if (!notificationMessage.data || typeof notificationMessage.data !== 'object') {
	        return false;
	    }
	    if (!notificationMessage.notificationId || typeof notificationMessage.notificationId !== 'string') {
	        return false;
	    }
	    return true;
	}
	exports.isNotificationMessage = isNotificationMessage;


/***/ },
/* 50 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * This is an implementation of the InternalApiDispatcher interface which functions by passing messages
	 * across a frame boundary. This is usually between the code where our javscript library has been included
	 * by a 3rd party dev and another frame where Tableau server has content.
	 */
	var CrossFrameDispatcher = (function () {
	    /**
	     * Creates an instance of CrossFrameDispatcher which will use the given messenger to communicate
	     * @param _messenger an instantiated and listening messenger object
	     */
	    function CrossFrameDispatcher(_messenger) {
	        this._messenger = _messenger;
	        // Collection of pending promises which are waiting to be resolved. When we receive a response back from the other frame,
	        // these promises can be either resolved or rejected
	        this._pendingPromises = {};
	        // The collection of notification handlers which have been registered with this dispatcher
	        this._notificationHandlers = [];
	        if (!this._messenger) {
	            throw 'Missing messenger object';
	        }
	        // Set up our message handlers. We only care about incoming notifications and command responses
	        this._messenger.setCommandResponseMessageHandler(this.onCommandResponse.bind(this));
	        this._messenger.setNotificationMessageHandler(this.onNotification.bind(this));
	    }
	    ////// Start InternalApiDispatcher implementation
	    CrossFrameDispatcher.prototype.setVersionNumber = function (versionNumber) {
	        this._versionNumber = versionNumber;
	    };
	    CrossFrameDispatcher.prototype.execute = function (verb, parameters) {
	        var _this = this;
	        // To execute a verb, we first prepare a command message and then define a promise.
	        var preparedMessage = this._messenger.prepareCommandMessage(verb, parameters);
	        var promise = new Promise(function (resolve, reject) {
	            // Save off the pending promise by the messageGuid we are about to send. When a response is
	            // received, we'll be able to resolve this promise with the result
	            _this._pendingPromises[preparedMessage.messageGuid] = { resolve: resolve, reject: reject };
	        });
	        // Actually send the message and return the promise
	        preparedMessage.send();
	        return promise;
	    };
	    CrossFrameDispatcher.prototype.registerNotificationHandler = function (handler) {
	        this._notificationHandlers.push(handler);
	    };
	    CrossFrameDispatcher.prototype.unregisterNotificationHandler = function (handler) {
	        this._notificationHandlers = this._notificationHandlers.filter(function (h) { return h !== handler; });
	    };
	    ////// End InternalApiDispatcher implementation
	    CrossFrameDispatcher.prototype.onCommandResponse = function (response) {
	        // We got a command response, look through the pending promises and resolve
	        if (Object.keys(this._pendingPromises).indexOf(response.commandGuid) < 0) {
	            return; // We don't have any reference to this command, just return
	        }
	        var pendingPromise = this._pendingPromises[response.commandGuid];
	        // If we have an error defined, reject the promise
	        if (response.error) {
	            pendingPromise.reject(response.error);
	        }
	        // If we have data defined, resolve the promise
	        if (response.data) {
	            pendingPromise.resolve({ result: response.data });
	        }
	        // Clean up our pending promises object
	        delete this._pendingPromises[response.commandGuid];
	    };
	    CrossFrameDispatcher.prototype.onNotification = function (notificationMessage) {
	        // Go through each notification handler we have registered and let them know a notification came in
	        for (var _i = 0, _a = this._notificationHandlers; _i < _a.length; _i++) {
	            var handler = _a[_i];
	            try {
	                handler({ notificationId: notificationMessage.notificationId, data: notificationMessage.data });
	            }
	            catch (e) {
	                // Ignore this. Wrap in try/catch so if one handler errors, the other still get the message
	            }
	        }
	    };
	    return CrossFrameDispatcher;
	}());
	exports.CrossFrameDispatcher = CrossFrameDispatcher;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_utils_1 = __webpack_require__(10);
	/**
	 * Represents the current version of the extensions library
	 */
	var VersionNumber = (function () {
	    // private constructor so everyone uses the singleton instance
	    function VersionNumber(versionString) {
	        var parts = versionString.split('.').map(function (p) { return parseInt(p, 10); });
	        if (parts.length !== 3) {
	            throw api_utils_1.TableauException.error(VersionNumber.INVALID_VERSION_NUMBER, [versionString]);
	        }
	        this.major = parts[0];
	        this.minor = parts[1];
	        this.fix = parts[2];
	    }
	    Object.defineProperty(VersionNumber, "Instance", {
	        /**
	         * Gets the singleton instance of the version number.
	         */
	        get: function () {
	            return VersionNumber._instance;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    VersionNumber.SetVersionNumber = function (numString) {
	        VersionNumber._instance = new VersionNumber(numString);
	    };
	    Object.defineProperty(VersionNumber.prototype, "formattedValue", {
	        get: function () {
	            return this.major + "." + this.minor + "." + this.fix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    VersionNumber.INVALID_VERSION_NUMBER = 'Invalid version number: ';
	    return VersionNumber;
	}());
	exports.VersionNumber = VersionNumber;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	Object.defineProperty(exports, "__esModule", { value: true });
	var EnumConverter_1 = __webpack_require__(11);
	exports.EnumConverter = EnumConverter_1.EnumConverter;
	var Param_1 = __webpack_require__(13);
	exports.Param = Param_1.Param;
	var TableauException_1 = __webpack_require__(12);
	exports.TableauException = TableauException_1.TableauException;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Sheet_1 = __webpack_require__(54);
	var Dashboard = (function (_super) {
	    __extends(Dashboard, _super);
	    function Dashboard(_dashboardImpl) {
	        var _this = _super.call(this, _dashboardImpl) || this;
	        _this._dashboardImpl = _dashboardImpl;
	        _dashboardImpl.initializeWithPublicInterfaces(_this);
	        return _this;
	    }
	    Object.defineProperty(Dashboard.prototype, "worksheets", {
	        get: function () {
	            return this._dashboardImpl.worksheets;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Dashboard.prototype, "objects", {
	        get: function () {
	            return this._dashboardImpl.objects;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Dashboard;
	}(Sheet_1.Sheet));
	exports.Dashboard = Dashboard;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	var Sheet = (function (_super) {
	    __extends(Sheet, _super);
	    function Sheet(_sheetImpl) {
	        var _this = _super.call(this) || this;
	        _this._sheetImpl = _sheetImpl;
	        return _this;
	    }
	    Object.defineProperty(Sheet.prototype, "name", {
	        get: function () {
	            return this._sheetImpl.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Sheet.prototype, "sheetType", {
	        get: function () {
	            return this._sheetImpl.sheetType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Sheet.prototype, "size", {
	        get: function () {
	            return this._sheetImpl.size;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Sheet.prototype.findParameterAsync = function (parameterName) {
	        return this._sheetImpl.findParameterAsync(parameterName, this);
	    };
	    Sheet.prototype.getParametersAsync = function () {
	        return this._sheetImpl.getParametersAsync(this);
	    };
	    return Sheet;
	}(api_shared_1.EventListenerManager));
	exports.Sheet = Sheet;


/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Implementation of the external DashboardContent namespace.
	 * This does not follow the Impl pattern as DashboardContent is
	 * currently just a (single) property bag.
	 */
	var DashboardContent = (function () {
	    function DashboardContent(_dashboard) {
	        this._dashboard = _dashboard;
	    }
	    Object.defineProperty(DashboardContent.prototype, "dashboard", {
	        get: function () {
	            return this._dashboard;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return DashboardContent;
	}());
	exports.DashboardContent = DashboardContent;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	/**
	 * Implementation of the external environment namespace.
	 * Environment does not follow the Impl pattern as it is
	 * just a property bag.
	 */
	var Environment = (function () {
	    function Environment(extensionEnvironment) {
	        this._apiVersion = extensionEnvironment.apiVersion;
	        this._context = api_shared_1.InternalToExternalEnumMappings.extensionContext.convert(extensionEnvironment.extensionContext);
	        this._language = extensionEnvironment.extensionLanguage;
	        this._locale = extensionEnvironment.extensionLocale;
	        this._mode = api_shared_1.InternalToExternalEnumMappings.extensionMode.convert(extensionEnvironment.extensionMode);
	        this._operatingSystem = extensionEnvironment.operatingSystem;
	        this._tableauVersion = extensionEnvironment.tableauVersion;
	    }
	    Object.defineProperty(Environment.prototype, "apiVersion", {
	        get: function () {
	            return this._apiVersion;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Environment.prototype, "context", {
	        get: function () {
	            return this._context;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Environment.prototype, "language", {
	        get: function () {
	            return this._language;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Environment.prototype, "locale", {
	        get: function () {
	            return this._locale;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Environment.prototype, "mode", {
	        get: function () {
	            return this._mode;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Environment.prototype, "operatingSystem", {
	        get: function () {
	            return this._operatingSystem;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Environment.prototype, "tableauVersion", {
	        get: function () {
	            return this._tableauVersion;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Environment;
	}());
	exports.Environment = Environment;


/***/ },
/* 57 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Implementation of the external settings namespace.
	 */
	var Settings = (function () {
	    function Settings(settingsImpl) {
	        this.settingsImpl = settingsImpl;
	    }
	    Settings.prototype.erase = function (key) {
	        this.settingsImpl.erase(key);
	    };
	    Settings.prototype.get = function (key) {
	        return this.settingsImpl.get(key);
	    };
	    Settings.prototype.getAll = function () {
	        return this.settingsImpl.getAll();
	    };
	    Object.defineProperty(Settings.prototype, "isModified", {
	        get: function () {
	            return this.settingsImpl.isModified;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Settings.prototype.saveAsync = function () {
	        return this.settingsImpl.saveAsync();
	    };
	    Settings.prototype.set = function (key, value) {
	        this.settingsImpl.set(key, value);
	    };
	    return Settings;
	}());
	exports.Settings = Settings;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	var InitializationServiceImpl_1 = __webpack_require__(59);
	var SettingsServiceImpl_1 = __webpack_require__(60);
	function registerAllExtensionsServices(dispatcher) {
	    api_shared_1.ApiServiceRegistry.instance.registerService(new InitializationServiceImpl_1.InitializationServiceImpl(dispatcher));
	    api_shared_1.ApiServiceRegistry.instance.registerService(new SettingsServiceImpl_1.SettingsServiceImpl(dispatcher));
	}
	exports.registerAllExtensionsServices = registerAllExtensionsServices;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_internal_contract_1 = __webpack_require__(2);
	var InitializationServiceImpl = (function () {
	    function InitializationServiceImpl(dispatcher) {
	        this.dispatcher = dispatcher;
	    }
	    Object.defineProperty(InitializationServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "InitializationService" /* InitializationService */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    InitializationServiceImpl.prototype.initializeDashboardExtensionsAsync = function () {
	        // We don't need any parameters for this call because they are added in for us by the dispatcher
	        return this.dispatcher.execute(api_internal_contract_1.VerbId.InitializeExtension, {}).then(function (response) {
	            // TODO - Validate return value
	            var result = response.result;
	            return result;
	        });
	    };
	    return InitializationServiceImpl;
	}());
	exports.InitializationServiceImpl = InitializationServiceImpl;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_internal_contract_1 = __webpack_require__(2);
	var api_utils_1 = __webpack_require__(52);
	var SettingsServiceImpl = (function () {
	    function SettingsServiceImpl(dispatcher) {
	        this.dispatcher = dispatcher;
	    }
	    Object.defineProperty(SettingsServiceImpl.prototype, "serviceName", {
	        get: function () {
	            return "SettingsService" /* SettingsService */;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SettingsServiceImpl.prototype.saveSettingsAsync = function (settings) {
	        var parameters = (_a = {}, _a[api_internal_contract_1.ParameterId.SettingsValues] = settings, _a);
	        return this.dispatcher.execute(api_internal_contract_1.VerbId.SaveExtensionSettings, parameters).then(function (value) {
	            var result = value.result;
	            if (!result || !result.settingsValues) {
	                throw api_utils_1.TableauException.internalError(['saving settings.']);
	            }
	            return (result.settingsValues);
	        });
	        var _a;
	    };
	    return SettingsServiceImpl;
	}());
	exports.SettingsServiceImpl = SettingsServiceImpl;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(62);
	var api_internal_contract_1 = __webpack_require__(2);
	var api_shared_1 = __webpack_require__(8);
	var DashboardObject_1 = __webpack_require__(63);
	var Worksheet_1 = __webpack_require__(64);
	var SheetImpl_1 = __webpack_require__(65);
	var SheetInfoImpl_1 = __webpack_require__(66);
	var WorksheetImpl_1 = __webpack_require__(67);
	var DashboardImpl = (function (_super) {
	    __extends(DashboardImpl, _super);
	    function DashboardImpl(_info, _sheetPath) {
	        var _this = _super.call(this, new SheetInfoImpl_1.SheetInfoImpl(_info.name, Contract.SheetType.Dashboard, new api_shared_1.Size(_info.size.h, _info.size.w))) || this;
	        _this._info = _info;
	        _this._sheetPath = _sheetPath;
	        return _this;
	    }
	    Object.defineProperty(DashboardImpl.prototype, "worksheets", {
	        get: function () {
	            return this._worksheets;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DashboardImpl.prototype, "objects", {
	        get: function () {
	            return this._objects;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DashboardImpl.prototype.initializeWithPublicInterfaces = function (dashboard) {
	        this._worksheets = new Array();
	        this._objects = new Array();
	        // Process all the zones which are contained in this dashboard
	        for (var _i = 0, _a = this._info.zones; _i < _a.length; _i++) {
	            var zone = _a[_i];
	            var worksheet = undefined;
	            var zoneSize = new api_shared_1.Size(zone.height, zone.width);
	            if (zone.zoneType === api_internal_contract_1.DashboardObjectType.Worksheet) {
	                var sheetInfo = new SheetInfoImpl_1.SheetInfoImpl(zone.name, Contract.SheetType.Worksheet, zoneSize);
	                var vizId = {
	                    worksheet: zone.name,
	                    dashboard: this._info.name,
	                    storyboard: this._sheetPath.storyboard,
	                    flipboardZoneID: this._sheetPath.flipboardZoneID,
	                    storyPointID: this._sheetPath.storyPointID
	                };
	                var worksheetImpl = new WorksheetImpl_1.WorksheetImpl(sheetInfo, vizId, dashboard);
	                worksheet = new Worksheet_1.Worksheet(worksheetImpl);
	                this._worksheets.push(worksheet);
	            }
	            var zonePoint = new api_shared_1.Point(zone.x, zone.y);
	            var dashboardObject = new DashboardObject_1.DashboardObject(dashboard, api_shared_1.InternalToExternalEnumMappings.dashboardObjectType.convert(zone.zoneType), zonePoint, zoneSize, worksheet);
	            this._objects.push(dashboardObject);
	        }
	    };
	    return DashboardImpl;
	}(SheetImpl_1.SheetImpl));
	exports.DashboardImpl = DashboardImpl;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * This is your main. This is where you re-export everything you want to be publicly available.
	 *
	 * The build enforces that the file has the same name as the global variable that is exported.
	 */
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(21));


/***/ },
/* 63 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Implementation of the dashboard objects - the zones in a dashboard.
	 * This does not follow the Impl pattern as it is just a property bag.
	 */
	var DashboardObject = (function () {
	    function DashboardObject(_dashboard, _type, _position, _size, _worksheet) {
	        this._dashboard = _dashboard;
	        this._type = _type;
	        this._position = _position;
	        this._size = _size;
	        this._worksheet = _worksheet;
	    }
	    Object.defineProperty(DashboardObject.prototype, "dashboard", {
	        get: function () {
	            return this._dashboard;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DashboardObject.prototype, "type", {
	        get: function () {
	            return this._type;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DashboardObject.prototype, "position", {
	        get: function () {
	            return this._position;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DashboardObject.prototype, "size", {
	        get: function () {
	            return this._size;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DashboardObject.prototype, "worksheet", {
	        get: function () {
	            return this._worksheet;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return DashboardObject;
	}());
	exports.DashboardObject = DashboardObject;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_utils_1 = __webpack_require__(52);
	var Sheet_1 = __webpack_require__(54);
	var Worksheet = (function (_super) {
	    __extends(Worksheet, _super);
	    function Worksheet(_worksheetImpl) {
	        var _this = _super.call(this, _worksheetImpl) || this;
	        _this._worksheetImpl = _worksheetImpl;
	        // Call to initialize events and then call down to the event listener manager to handle things
	        _this._worksheetImpl.initializeEvents(_this).forEach(function (e) { return _this.addNewEventType(e); });
	        return _this;
	    }
	    Object.defineProperty(Worksheet.prototype, "parentDashboard", {
	        get: function () {
	            return this._worksheetImpl.parentDashboard;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Worksheet.prototype.applyFilterAsync = function (fieldName, values, updateType, options) {
	        return this._worksheetImpl.applyFilterAsync(fieldName, values, updateType, options);
	    };
	    Worksheet.prototype.applyRangeFilterAsync = function (fieldName, filterOptions) {
	        return this._worksheetImpl.applyRangeFilterAsync(fieldName, filterOptions);
	    };
	    Worksheet.prototype.clearFilterAsync = function (fieldName) {
	        return this._worksheetImpl.clearFilterAsync(fieldName);
	    };
	    Worksheet.prototype.getAnalyticObjectsAsync = function () {
	        throw api_utils_1.TableauException.apiNotImplemented(['getAnalyticObjectsAsync']);
	    };
	    Worksheet.prototype.getDataSourcesAsync = function () {
	        return this._worksheetImpl.getDataSourcesAsync();
	    };
	    Worksheet.prototype.getEncodingsAsync = function () {
	        throw api_utils_1.TableauException.apiNotImplemented(['getEncodingsAsync']);
	    };
	    Worksheet.prototype.getFiltersAsync = function () {
	        return this._worksheetImpl.getFiltersAsync();
	    };
	    Worksheet.prototype.getSelectedMarksAsync = function () {
	        return this._worksheetImpl.getSelectedMarksAsync();
	    };
	    Worksheet.prototype.getHighlightedMarksAsync = function () {
	        return this._worksheetImpl.getHighlightedMarksAsync();
	    };
	    Worksheet.prototype.getSummaryDataAsync = function (options) {
	        return this._worksheetImpl.getSummaryDataAsync(options);
	    };
	    Worksheet.prototype.getUnderlyingDataAsync = function (options) {
	        return this._worksheetImpl.getUnderlyingDataAsync(options);
	    };
	    Worksheet.prototype.clearSelectedMarksAsync = function () {
	        return this._worksheetImpl.clearSelectedMarksAsync();
	    };
	    Worksheet.prototype.selectMarksByIDAsync = function (marksInfo, updateType) {
	        return this._worksheetImpl.selectMarksByIdAsync(marksInfo, updateType);
	    };
	    Worksheet.prototype.selectMarksByValueAsync = function (selections, selectionUpdateType) {
	        return this._worksheetImpl.selectMarksByValueAsync(selections, selectionUpdateType);
	    };
	    Worksheet.prototype.selectMarksByIdAsync = function (selections, selectionUpdateType) {
	        return this._worksheetImpl.selectMarksByIdAsync(selections, selectionUpdateType);
	    };
	    return Worksheet;
	}(Sheet_1.Sheet));
	exports.Worksheet = Worksheet;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	var SheetImpl = (function () {
	    function SheetImpl(_sheetInfoImpl) {
	        this._sheetInfoImpl = _sheetInfoImpl;
	    }
	    Object.defineProperty(SheetImpl.prototype, "name", {
	        get: function () {
	            return this._sheetInfoImpl.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SheetImpl.prototype, "sheetType", {
	        get: function () {
	            return this._sheetInfoImpl.sheetType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SheetImpl.prototype, "sheetPath", {
	        get: function () {
	            return this._sheetInfoImpl.sheetPath;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SheetImpl.prototype, "size", {
	        get: function () {
	            return this._sheetInfoImpl.sheetSize;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SheetImpl.prototype.findParameterAsync = function (parameterName, sheet) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("parameters-service" /* Parameters */);
	        return service.findParameterByNameAsync(parameterName, sheet);
	    };
	    SheetImpl.prototype.getParametersAsync = function (sheet) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("parameters-service" /* Parameters */);
	        return service.getParametersForSheetAsync(this.sheetPath, sheet);
	    };
	    return SheetImpl;
	}());
	exports.SheetImpl = SheetImpl;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_external_contract_1 = __webpack_require__(62);
	var SheetInfoImpl = (function () {
	    function SheetInfoImpl(_name, _sheetType, _sheetSize) {
	        this._name = _name;
	        this._sheetType = _sheetType;
	        this._sheetSize = _sheetSize;
	    }
	    Object.defineProperty(SheetInfoImpl.prototype, "name", {
	        get: function () {
	            return this._name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SheetInfoImpl.prototype, "sheetSize", {
	        get: function () {
	            return this._sheetSize;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SheetInfoImpl.prototype, "sheetType", {
	        get: function () {
	            return this._sheetType;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SheetInfoImpl.prototype, "sheetPath", {
	        get: function () {
	            return {
	                sheetName: this.name,
	                isDashboard: this.sheetType === api_external_contract_1.SheetType.Dashboard
	                // TODO - Stories
	            };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return SheetInfoImpl;
	}());
	exports.SheetInfoImpl = SheetInfoImpl;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Contract = __webpack_require__(62);
	var api_internal_contract_1 = __webpack_require__(2);
	var api_shared_1 = __webpack_require__(8);
	var DataSource_1 = __webpack_require__(68);
	var DataSourceImpl_1 = __webpack_require__(69);
	var SheetImpl_1 = __webpack_require__(65);
	var visualIdsAreEqual = function (a, b) {
	    return a && b &&
	        a.worksheet === b.worksheet &&
	        a.dashboard === b.dashboard &&
	        a.storyboard === b.storyboard &&
	        a.storyPointID === b.storyPointID &&
	        a.flipboardZoneID === b.flipboardZoneID;
	};
	var WorksheetImpl = (function (_super) {
	    __extends(WorksheetImpl, _super);
	    function WorksheetImpl(sheetInfoImpl, _visualId, _parentDashboard) {
	        var _this = _super.call(this, sheetInfoImpl) || this;
	        _this._visualId = _visualId;
	        _this._parentDashboard = _parentDashboard;
	        return _this;
	    }
	    Object.defineProperty(WorksheetImpl.prototype, "parentDashboard", {
	        get: function () {
	            return this._parentDashboard;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /**
	     * Helper method which goes through and registers each event type this impl knows about
	     * with the NotificationService. It returns an array of SingleEventManager objects which
	     * can then be passed to an EventListenerManager to handle user registration / unregistration.
	     *
	     * @param {Worksheet} worksheet The worksheet object which will be included with the event notifications
	     * @returns {Array<SingleEventManager>} Collection of event managers to pass to an EventListenerManager
	     */
	    WorksheetImpl.prototype.initializeEvents = function (worksheet) {
	        var _this = this;
	        var results = new Array();
	        var notificationService;
	        try {
	            notificationService = api_shared_1.ApiServiceRegistry.instance.getService("notification-service" /* Notification */);
	        }
	        catch (e) {
	            // If we don't have this service registered, just return
	            return results;
	        }
	        // Initialize all of the event managers we'll need (one for each event type)
	        var marksEvent = new api_shared_1.SingleEventManagerImpl(Contract.TableauEventType.MarkSelectionChanged);
	        notificationService.registerHandler(api_internal_contract_1.NotificationId.SelectedMarksChanged, function (model) {
	            var visualId = model;
	            return visualIdsAreEqual(visualId, _this.visualId);
	        }, function (viz) {
	            marksEvent.triggerEvent(function () { return new api_shared_1.MarksSelectedEvent(worksheet); });
	        });
	        var filterEvent = new api_shared_1.SingleEventManagerImpl(Contract.TableauEventType.FilterChanged);
	        notificationService.registerHandler(api_internal_contract_1.NotificationId.FilterChanged, function (model) {
	            var filterEventResponse = model;
	            return _this.visualId.worksheet === filterEventResponse.visualId.worksheet;
	        }, function (event) {
	            filterEvent.triggerEvent(function () { return new api_shared_1.FilterChangedEvent(worksheet, event.fieldName); });
	        });
	        results.push(marksEvent);
	        results.push(filterEvent);
	        // TODO - other event types
	        return results;
	    };
	    Object.defineProperty(WorksheetImpl.prototype, "visualId", {
	        get: function () {
	            return this._visualId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WorksheetImpl.prototype.applyFilterAsync = function (fieldName, values, updateType, options) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
	        return service.applyFilterAsync(this.visualId, fieldName, values, updateType, options);
	    };
	    WorksheetImpl.prototype.applyRangeFilterAsync = function (fieldName, filterOptions) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
	        return service.applyRangeFilterAsync(this.visualId, fieldName, filterOptions);
	    };
	    WorksheetImpl.prototype.clearFilterAsync = function (fieldName) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
	        return service.clearFilterAsync(this.visualId, fieldName);
	    };
	    WorksheetImpl.prototype.getDataSourcesAsync = function () {
	        var _this = this;
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("data-source-service" /* DataSourceService */);
	        return service.getDataSourcesAsync().then(function (result) {
	            var dataSchema = result;
	            var worksheetDataSourceInfo = dataSchema.worksheetDataSchemaMap[_this.name];
	            var dataSources = [];
	            // First, add the primary datasource.  By convention, it comes first in the returned array.
	            var primaryId = worksheetDataSourceInfo.primaryDataSource;
	            dataSources.push(_this.createDataSourceFromInfo(dataSchema.dataSources[primaryId]));
	            // Then, loop through any secondary data sources and add them.
	            for (var _i = 0, _a = worksheetDataSourceInfo.referencedDataSourceList; _i < _a.length; _i++) {
	                var secondaryId = _a[_i];
	                if (secondaryId !== primaryId) {
	                    dataSources.push(_this.createDataSourceFromInfo(dataSchema.dataSources[secondaryId]));
	                }
	            }
	            return dataSources;
	        });
	    };
	    WorksheetImpl.prototype.getFiltersAsync = function () {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("filter-service" /* Filter */);
	        return service.getFiltersAsync(this.visualId);
	    };
	    WorksheetImpl.prototype.getSelectedMarksAsync = function () {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
	        return service.getSelectedMarksAsync(this.visualId);
	    };
	    WorksheetImpl.prototype.getHighlightedMarksAsync = function () {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
	        return service.getHighlightedMarksAsync(this.visualId);
	    };
	    WorksheetImpl.prototype.getSummaryDataAsync = function (options) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
	        options = options || {};
	        return service.getUnderlyingDataAsync(this.visualId, api_shared_1.GetDataType.Summary, !!options.ignoreAliases, !!options.ignoreSelection, true, 0);
	    };
	    WorksheetImpl.prototype.getUnderlyingDataAsync = function (options) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
	        options = options || {};
	        return service.getUnderlyingDataAsync(this.visualId, api_shared_1.GetDataType.Underlying, !!options.ignoreAliases, !!options.ignoreSelection, !!options.includeAllColumns, options.maxRows || 0);
	    };
	    WorksheetImpl.prototype.clearSelectedMarksAsync = function () {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("selection-service" /* Selection */);
	        return service.clearSelectedMarksAsync(this.visualId);
	    };
	    WorksheetImpl.prototype.selectMarksByValueAsync = function (selections, selectionUpdateType) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("selection-service" /* Selection */);
	        return service.selectMarksByValueAsync(this.visualId, selections, selectionUpdateType);
	    };
	    WorksheetImpl.prototype.selectMarksByIdAsync = function (selections, selectionUpdateType) {
	        var service = api_shared_1.ApiServiceRegistry.instance.getService("selection-service" /* Selection */);
	        return service.selectMarksByIdAsync(this.visualId, selections, selectionUpdateType);
	    };
	    WorksheetImpl.prototype.createDataSourceFromInfo = function (dataSourceInfo) {
	        var dataSourceImpl = new DataSourceImpl_1.DataSourceImpl(dataSourceInfo);
	        var dataSource = new DataSource_1.DataSource(dataSourceImpl);
	        dataSourceImpl.initializeWithPublicInterfaces(dataSource);
	        return dataSource;
	    };
	    return WorksheetImpl;
	}(SheetImpl_1.SheetImpl));
	exports.WorksheetImpl = WorksheetImpl;


/***/ },
/* 68 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var DataSource = (function () {
	    function DataSource(_dataSourceImpl) {
	        this._dataSourceImpl = _dataSourceImpl;
	    }
	    Object.defineProperty(DataSource.prototype, "name", {
	        get: function () {
	            return this._dataSourceImpl.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSource.prototype, "id", {
	        get: function () {
	            return this._dataSourceImpl.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSource.prototype, "fields", {
	        get: function () {
	            return this._dataSourceImpl.fields;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSource.prototype, "extractUpdateTime", {
	        get: function () {
	            return this._dataSourceImpl.extractUpdateTime;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSource.prototype, "isExtract", {
	        get: function () {
	            return this._dataSourceImpl.isExtract;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DataSource.prototype.refreshAsync = function () {
	        return this._dataSourceImpl.refreshAsync();
	    };
	    DataSource.prototype.getActiveTablesAsync = function () {
	        return this._dataSourceImpl.getActiveTablesAsync();
	    };
	    DataSource.prototype.getConnectionSummariesAsync = function () {
	        return this._dataSourceImpl.getConnectionSummariesAsync();
	    };
	    DataSource.prototype.getUnderlyingDataAsync = function (options) {
	        return this._dataSourceImpl.getUnderlyingDataAsync(options);
	    };
	    return DataSource;
	}());
	exports.DataSource = DataSource;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	var api_utils_1 = __webpack_require__(52);
	var FieldImpl_1 = __webpack_require__(70);
	var Field_1 = __webpack_require__(71);
	var TableSummary_1 = __webpack_require__(72);
	var DataSourceImpl = (function () {
	    function DataSourceImpl(_dataSourceInfo) {
	        var _this = this;
	        this._dataSourceInfo = _dataSourceInfo;
	        this._fields = _dataSourceInfo.fields.map(function (fieldModel) {
	            var fieldImpl = new FieldImpl_1.FieldImpl(fieldModel, _this);
	            return new Field_1.Field(fieldImpl);
	        });
	    }
	    Object.defineProperty(DataSourceImpl.prototype, "name", {
	        get: function () {
	            return this._dataSourceInfo.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSourceImpl.prototype, "id", {
	        get: function () {
	            return this._dataSourceInfo.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSourceImpl.prototype, "extractUpdateTime", {
	        get: function () {
	            return this._dataSourceInfo.extractUpdateTime;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSourceImpl.prototype, "fields", {
	        get: function () {
	            return this._fields;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DataSourceImpl.prototype, "isExtract", {
	        get: function () {
	            return this._dataSourceInfo.isExtract;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DataSourceImpl.prototype.refreshAsync = function () {
	        var dataSourceService = api_shared_1.ApiServiceRegistry.instance.getService("data-source-service" /* DataSourceService */);
	        return dataSourceService.refreshAsync(this._dataSourceInfo.id);
	    };
	    DataSourceImpl.prototype.getConnectionSummariesAsync = function () {
	        throw api_utils_1.TableauException.apiNotImplemented(['DataSource connectionSummaries']);
	    };
	    DataSourceImpl.prototype.getActiveTablesAsync = function () {
	        var dataSourceService = api_shared_1.ApiServiceRegistry.instance.getService("data-source-service" /* DataSourceService */);
	        return dataSourceService.getActiveTablesAsync(this._dataSourceInfo.id).then(function (tableInfos) {
	            return tableInfos.map(function (tableInfo) { return new TableSummary_1.TableSummary(tableInfo); });
	        });
	    };
	    DataSourceImpl.prototype.getUnderlyingDataAsync = function (options) {
	        var defaultOptions = {
	            ignoreAliases: false,
	            maxRows: 10000,
	            columnsToInclude: [],
	        };
	        options = options || {};
	        var getDataService = api_shared_1.ApiServiceRegistry.instance.getService("get-data-service" /* GetData */);
	        return getDataService.getDataSourceDataAsync(this.id, !!options.ignoreAliases, options.maxRows || defaultOptions.maxRows, options.columnsToInclude || defaultOptions.columnsToInclude);
	    };
	    DataSourceImpl.prototype.initializeWithPublicInterfaces = function (dataSource) {
	        this._fields = this._dataSourceInfo.fields.map(function (fieldModel) {
	            var fieldImpl = new FieldImpl_1.FieldImpl(fieldModel, dataSource);
	            return new Field_1.Field(fieldImpl);
	        });
	    };
	    return DataSourceImpl;
	}());
	exports.DataSourceImpl = DataSourceImpl;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	var FieldImpl = (function () {
	    function FieldImpl(_fieldInfo, _parentDataSource) {
	        this._fieldInfo = _fieldInfo;
	        this._parentDataSource = _parentDataSource;
	    }
	    Object.defineProperty(FieldImpl.prototype, "name", {
	        get: function () {
	            return this._fieldInfo.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "id", {
	        get: function () {
	            return this._fieldInfo.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "description", {
	        get: function () {
	            return this._fieldInfo.description;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "aggregation", {
	        get: function () {
	            return api_shared_1.InternalToExternalEnumMappings.fieldAggregationType.convert(this._fieldInfo.aggregation);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "dataSource", {
	        get: function () {
	            return this._parentDataSource;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "role", {
	        get: function () {
	            return api_shared_1.InternalToExternalEnumMappings.fieldRoleType.convert(this._fieldInfo.role);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "isHidden", {
	        get: function () {
	            return this._fieldInfo.isHidden;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "isGenerated", {
	        get: function () {
	            return this._fieldInfo.isGenerated;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "isCalculatedField", {
	        get: function () {
	            return this._fieldInfo.isCalculatedField;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(FieldImpl.prototype, "isCombinedField", {
	        get: function () {
	            return this._fieldInfo.isCombinedField;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FieldImpl.prototype.getCalculatedFieldAsync = function () {
	        throw new Error('Field getCalculatedFieldAsync method not yet implemented.');
	    };
	    return FieldImpl;
	}());
	exports.FieldImpl = FieldImpl;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_utils_1 = __webpack_require__(52);
	var Field = (function () {
	    function Field(_fieldImpl) {
	        this._fieldImpl = _fieldImpl;
	    }
	    Object.defineProperty(Field.prototype, "name", {
	        get: function () {
	            return this._fieldImpl.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "id", {
	        get: function () {
	            return this._fieldImpl.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "description", {
	        get: function () {
	            return this._fieldImpl.description;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "aggregation", {
	        get: function () {
	            return this._fieldImpl.aggregation;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "dataSource", {
	        get: function () {
	            return this._fieldImpl.dataSource;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "role", {
	        get: function () {
	            return this._fieldImpl.role;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "isHidden", {
	        get: function () {
	            return this._fieldImpl.isHidden;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "isGenerated", {
	        get: function () {
	            return this._fieldImpl.isGenerated;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "isCalculatedField", {
	        get: function () {
	            return this._fieldImpl.isCalculatedField;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "columnType", {
	        get: function () {
	            throw api_utils_1.TableauException.apiNotImplemented(['Field.columnType']);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Field.prototype, "isCombinedField", {
	        get: function () {
	            return this._fieldImpl.isCombinedField;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Field.prototype.getCalculatedFieldAsync = function () {
	        return this._fieldImpl.getCalculatedFieldAsync();
	    };
	    return Field;
	}());
	exports.Field = Field;


/***/ },
/* 72 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Implementation of a table summary.
	 * This does not follow the Impl pattern as it is just a property bag.
	 */
	var TableSummary = (function () {
	    function TableSummary(_tableInfo) {
	        this._tableInfo = _tableInfo;
	    }
	    Object.defineProperty(TableSummary.prototype, "name", {
	        get: function () {
	            return this._tableInfo.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TableSummary.prototype, "id", {
	        get: function () {
	            return this._tableInfo.id;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TableSummary.prototype, "connectionId", {
	        get: function () {
	            return this._tableInfo.connectionId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TableSummary.prototype, "customSQL", {
	        get: function () {
	            return this._tableInfo.customSQL;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return TableSummary;
	}());
	exports.TableSummary = TableSummary;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var api_shared_1 = __webpack_require__(8);
	var api_utils_1 = __webpack_require__(52);
	var SettingsImpl = (function () {
	    function SettingsImpl(settingsInfo) {
	        // Since promises can't be introspected for state, keep a variable that
	        // indicates a save is in progress, so that set/erase can't be called during a save.
	        this._saveInProgress = false;
	        this.initializeSettings(settingsInfo);
	    }
	    SettingsImpl.prototype.erase = function (key) {
	        api_utils_1.Param.verifyValue(key, 'key');
	        // Only make a modification if we have the key already
	        if (this._currentSettings[key]) {
	            this.verifySettingsAreUnlocked();
	            delete this._currentSettings[key];
	            this._isModified = true;
	        }
	    };
	    SettingsImpl.prototype.get = function (key) {
	        api_utils_1.Param.verifyValue(key, 'key');
	        return this._currentSettings[key];
	    };
	    SettingsImpl.prototype.getAll = function () {
	        // Returns a mutable copy of the settings
	        return Object.assign({}, this._currentSettings);
	    };
	    Object.defineProperty(SettingsImpl.prototype, "isModified", {
	        get: function () {
	            return this._isModified;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SettingsImpl.prototype.saveAsync = function () {
	        var _this = this;
	        this.verifySettingsAreUnlocked();
	        // Just resolve immediately if settings are unchanged
	        if (!this._isModified) {
	            return Promise.resolve(this._currentSettings);
	        }
	        this._saveInProgress = true;
	        // Use the settings service to save settings to twb
	        var settingsService = api_shared_1.ApiServiceRegistry.instance.getService("SettingsService" /* SettingsService */);
	        return settingsService.saveSettingsAsync(this._currentSettings).then(function (newSettings) {
	            _this._saveInProgress = false;
	            _this._isModified = false;
	            Object.assign(_this._currentSettings, newSettings);
	            return newSettings;
	        });
	    };
	    SettingsImpl.prototype.set = function (key, value) {
	        api_utils_1.Param.verifyValue(key, 'key'); // Key shouldn't be an empty string.
	        api_utils_1.Param.verifyString(value, 'value'); // Empty string value is allowed.
	        this.verifySettingsAreUnlocked();
	        this._currentSettings[key] = value;
	        this._isModified = true;
	    };
	    SettingsImpl.prototype.initializeSettings = function (settingsInfo) {
	        api_utils_1.Param.verifyValue(settingsInfo, 'settingsInfo');
	        api_utils_1.Param.verifyValue(settingsInfo.settingsValues, 'settingsInfo.SettingsValues');
	        this._currentSettings = settingsInfo.settingsValues;
	        // Reset the isModified flag
	        this._isModified = false;
	    };
	    /**
	     * This helper should be called before any local update to this.currentSettings.
	     * Checks if a current save call is still in progress and throws an error if so.
	     */
	    SettingsImpl.prototype.verifySettingsAreUnlocked = function () {
	        if (this._saveInProgress) {
	            throw api_utils_1.TableauException.error(SettingsImpl.ASYNC_SAVE_IN_PROGRESS);
	        }
	    };
	    SettingsImpl.ASYNC_SAVE_IN_PROGRESS = 'Async Save is in progress, updating settings is not allowed.';
	    return SettingsImpl;
	}());
	exports.SettingsImpl = SettingsImpl;


/***/ },
/* 74 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Implementation of the external Extensions namespace.
	 */
	var Extensions = (function () {
	    function Extensions(extensionImpl) {
	        this.extensionImpl = extensionImpl;
	        this.extensionImpl = extensionImpl;
	    }
	    Object.defineProperty(Extensions.prototype, "dashboardContent", {
	        get: function () {
	            return this.extensionImpl.dashboardContent;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Extensions.prototype, "environment", {
	        get: function () {
	            return this.extensionImpl.environment;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Extensions.prototype, "settings", {
	        get: function () {
	            return this.extensionImpl.settings;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Extensions.prototype, "ui", {
	        get: function () {
	            throw new Error('API call not yet implemented');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Extensions.prototype.initializeAsync = function () {
	        return this.extensionImpl.initializeAsync();
	    };
	    return Extensions;
	}());
	exports.Extensions = Extensions;


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyZjFiN2ZmYzRlYmIyNGZhMDYwNCIsIndlYnBhY2s6Ly8vLi4vc3JjL0V4dGVuc2lvbnNBcGkudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9JbnRlcm5hbC9FeHRlbnNpb25zSW1wbC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktaW50ZXJuYWwtY29udHJhY3Qvc3JjL0FwaUludGVybmFsQ29udHJhY3QudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLWludGVybmFsLWNvbnRyYWN0L3NyYy9pbnRlcmZhY2UvRW51bXMudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLWludGVybmFsLWNvbnRyYWN0L3NyYy9pbnRlcmZhY2UvSW50ZXJuYWxBcGlEaXNwYXRjaGVyLnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS1pbnRlcm5hbC1jb250cmFjdC9zcmMvaW50ZXJmYWNlL05vdGlmaWNhdGlvbnMudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLWludGVybmFsLWNvbnRyYWN0L3NyYy9pbnRlcmZhY2UvUGFyYW1ldGVycy50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktaW50ZXJuYWwtY29udHJhY3Qvc3JjL2ludGVyZmFjZS9WZXJicy50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9BcGlTaGFyZWQudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRXZlbnRMaXN0ZW5lck1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXV0aWxzL3NyYy9BcGlVdGlscy50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktdXRpbHMvc3JjL0VudW1Db252ZXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXV0aWxzL3NyYy9UYWJsZWF1RXhjZXB0aW9uLnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS11dGlscy9zcmMvUGFyYW0udHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvUGFyYW1ldGVyLnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1BvaW50LnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1NpemUudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvTW9kZWxzL0dldERhdGFNb2RlbHMudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRXhjZXB0aW9ucy9UYWJsZWF1RXhjZXB0aW9ucy50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9FdmVudHMvRmlsdGVyQ2hhbmdlZEV2ZW50LnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS1leHRlcm5hbC1jb250cmFjdC9zcmMvQXBpRXh0ZXJuYWxDb250cmFjdC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktZXh0ZXJuYWwtY29udHJhY3Qvc3JjL0VudW1zLnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0V2ZW50cy9UYWJsZWF1V29ya3NoZWV0RXZlbnQudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRXZlbnRzL1RhYmxlYXVTaGVldEV2ZW50LnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0V2ZW50cy9UYWJsZWF1RXZlbnQudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRXZlbnRzL01hcmtzU2VsZWN0ZWRFdmVudC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9JbnRlcm5hbC9TaW5nbGVFdmVudE1hbmFnZXJJbXBsLnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1NlcnZpY2VzL0dldERhdGFTZXJ2aWNlLnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1NlcnZpY2VzL1JlZ2lzdGVyQWxsU2hhcmVkU2VydmljZXMudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvU2VydmljZXMvaW1wbC9EYXRhU291cmNlU2VydmljZUltcGwudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvU2VydmljZXMvaW1wbC9GaWx0ZXJTZXJ2aWNlSW1wbC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9FbnVtTWFwcGluZ3MvRXh0ZXJuYWxUb0ludGVybmFsRW51bU1hcHBpbmdzLnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0VudW1NYXBwaW5ncy9JbnRlcm5hbFRvRXh0ZXJuYWxFbnVtTWFwcGluZ3MudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvTW9kZWxzL0ZpbHRlck1vZGVscy50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9TZXJ2aWNlUmVnaXN0cnkudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvU2VydmljZXMvaW1wbC9HZXREYXRhU2VydmljZUltcGwudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvU2VydmljZXMvaW1wbC9Ob3RpZmljYXRpb25TZXJ2aWNlSW1wbC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9pbXBsL1BhcmFtZXRlcnNTZXJ2aWNlSW1wbC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9JbnRlcm5hbC9QYXJhbWV0ZXJJbXBsLnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0V2ZW50cy9QYXJhbWV0ZXJDaGFuZ2VkRXZlbnQudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvU2VydmljZXMvaW1wbC9TZWxlY3Rpb25TZXJ2aWNlSW1wbC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9Nb2RlbHMvU2VsZWN0aW9uTW9kZWxzLnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0Nyb3NzRnJhbWUvQ3Jvc3NGcmFtZUJvb3RzdHJhcC50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktbWVzc2FnaW5nL3NyYy9BcGlNZXNzYWdpbmcudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLW1lc3NhZ2luZy9zcmMvQ3Jvc3NGcmFtZU1lc3Nlbmdlci50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0d1aWQudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLW1lc3NhZ2luZy9zcmMvQ3Jvc3NGcmFtZVByZXBhcmVkTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vRDovZGV2L2pzLWFwaS9hcGktbWVzc2FnaW5nL3NyYy9pbnRlcmZhY2UvTWVzc2FnZVR5cGVzLnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS1tZXNzYWdpbmcvc3JjL01lc3NhZ2VUeXBlQ2hlY2tzLnRzIiwid2VicGFjazovLy9EOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0Nyb3NzRnJhbWUvQ3Jvc3NGcmFtZURpc3BhdGNoZXIudHMiLCJ3ZWJwYWNrOi8vL0Q6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvVmVyc2lvbk51bWJlci50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0Rhc2hib2FyZC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL1NoZWV0LnRzIiwid2VicGFjazovLy8uLi9zcmMvTmFtZXNwYWNlcy9EYXNoYm9hcmRDb250ZW50LnRzIiwid2VicGFjazovLy8uLi9zcmMvTmFtZXNwYWNlcy9FbnZpcm9ubWVudC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL05hbWVzcGFjZXMvU2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9TZXJ2aWNlcy9SZWdpc3RlckFsbEV4dGVuc2lvbnNTZXJ2aWNlcy50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL1NlcnZpY2VzL0ltcGwvSW5pdGlhbGl6YXRpb25TZXJ2aWNlSW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL1NlcnZpY2VzL0ltcGwvU2V0dGluZ3NTZXJ2aWNlSW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0ludGVybmFsL0Rhc2hib2FyZEltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9EYXNoYm9hcmRPYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9Xb3Jrc2hlZXQudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9JbnRlcm5hbC9TaGVldEltcGwudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9JbnRlcm5hbC9TaGVldEluZm9JbXBsLnRzIiwid2VicGFjazovLy8uLi9zcmMvSW50ZXJuYWwvV29ya3NoZWV0SW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0RhdGFTb3VyY2UudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9JbnRlcm5hbC9EYXRhU291cmNlSW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0ludGVybmFsL0ZpZWxkSW1wbC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL0ZpZWxkLnRzIiwid2VicGFjazovLy8uLi9zcmMvVGFibGVTdW1tYXJ5LnRzIiwid2VicGFjazovLy8uLi9zcmMvSW50ZXJuYWwvU2V0dGluZ3NJbXBsLnRzIiwid2VicGFjazovLy8uLi9zcmMvTmFt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QUMsTUFBTTtTQUMxRSxHQUFDLDRDQUE0QixDQUFDLEdBQUcsSUFBRyw0Q0FBNEIsQ0FBQyxHQUFHO1NBQ3BFLEdBQUMsNENBQTRCLENBQUMsR0FBRyxJQUFHLDRDQUE0QixDQUFDLEdBQUc7U0FDcEUsR0FBQyw0Q0FBNEIsQ0FBQyxJQUFJLElBQUcsNENBQTRCLENBQUMsSUFBSTtTQUN0RSxHQUFDLDRDQUE0QixDQUFDLEtBQUssSUFBRyw0Q0FBNEIsQ0FBQyxLQUFLO1NBQ3hFLEdBQUMsNENBQTRCLENBQUMsUUFBUSxJQUFHLDRDQUE0QixDQUFDLFFBQVE7U0FDOUUsR0FBQyw0Q0FBNEIsQ0FBQyxHQUFHLElBQUcsNENBQTRCLENBQUMsR0FBRztTQUNwRSxHQUFDLDRDQUE0QixDQUFDLEdBQUcsSUFBRyw0Q0FBNEIsQ0FBQyxHQUFHO1NBQ3BFLEdBQUMsNENBQTRCLENBQUMsTUFBTSxJQUFHLDRDQUE0QixDQUFDLE1BQU07U0FDMUUsR0FBQyw0Q0FBNEIsQ0FBQyxHQUFHLElBQUcsNENBQTRCLENBQUMsR0FBRztTQUNwRSxHQUFDLDRDQUE0QixDQUFDLE1BQU0sSUFBRyw0Q0FBNEIsQ0FBQyxNQUFNO1NBQzFFLEdBQUMsNENBQTRCLENBQUMsU0FBUyxJQUFHLDRDQUE0QixDQUFDLFNBQVM7U0FDaEYsR0FBQyw0Q0FBNEIsQ0FBQyxJQUFJLElBQUcsNENBQTRCLENBQUMsSUFBSTtTQUN0RSxHQUFDLDRDQUE0QixDQUFDLEdBQUcsSUFBRyw0Q0FBNEIsQ0FBQyxHQUFHO1NBQ3BFLEdBQUMsNENBQTRCLENBQUMsTUFBTSxJQUFHLDRDQUE0QixDQUFDLE1BQU07U0FDMUUsR0FBQyw0Q0FBNEIsQ0FBQyxNQUFNLElBQUcsNENBQTRCLENBQUMsTUFBTTtTQUMxRSxHQUFDLDRDQUE0QixDQUFDLE1BQU0sSUFBRyw0Q0FBNEIsQ0FBQyxNQUFNO1NBQzFFLEdBQUMsNENBQTRCLENBQUMsUUFBUSxJQUFHLDRDQUE0QixDQUFDLFFBQVE7U0FDOUUsR0FBQyw0Q0FBNEIsQ0FBQyxLQUFLLElBQUcsNENBQTRCLENB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QUNILGlCQUFDO0FBQUQsRUFBQztBQXhCWSxpQ0FBVSIsImZpbGUiOiJAdGFibGVhdS9leHRlbnNpb25zLWFwaS4wLjYuMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInRhYmxlYXVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widGFibGVhdVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMmYxYjdmZmM0ZWJiMjRmYTA2MDRcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyB5b3VyIG1haW4uIFRoaXMgaXMgd2hlcmUgeW91IHJlLWV4cG9ydCBldmVyeXRoaW5nIHlvdSB3YW50IHRvIGJlIHB1YmxpY2x5IGF2YWlsYWJsZS5cclxuICpcclxuICogVGhlIGJ1aWxkIGVuZm9yY2VzIHRoYXQgdGhlIGZpbGUgaGFzIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGdsb2JhbCB2YXJpYWJsZSB0aGF0IGlzIGV4cG9ydGVkLlxyXG4gKi9cclxuXHJcbi8vIER1ZSB0byB0aGUgd2F5IHdlIGNvbmZpZ3VyZWQgd2VicGFjaywgd2Ugc2hvdWxkIGJlIGV4cG9ydGluZyB0aGluZ3Mgd2hpY2ggd2lsbCBiZSB1bmRlclxyXG4vLyBhIGdsb2JhbCB2YXJpYWJsZSBjYWxsZWQgXCJ0YWJsZWF1XCIuIEV4cG9ydCBldmVyeXRoaW5nIHdlIHdhbnQgdG8gYmUgdmlzaWJsZSB1bmRlciB0YWJsZWF1XHJcbi8vIGZyb20gdGhpcyBmaWxlLlxyXG5cclxuaW1wb3J0IHsgRXh0ZW5zaW9uc0ltcGwgfSBmcm9tICcuL0ludGVybmFsL0V4dGVuc2lvbnNJbXBsJztcclxuaW1wb3J0IHsgRXh0ZW5zaW9ucyB9IGZyb20gJy4vTmFtZXNwYWNlcy9FeHRlbnNpb25zJztcclxuXHJcbmltcG9ydCB7IFZlcnNpb25OdW1iZXIgfSBmcm9tICdAdGFibGVhdS9hcGktc2hhcmVkJztcclxuXHJcbmRlY2xhcmUgdmFyIEVYVEVOU0lPTl9BUElfVkVSU0lPTl9OVU1CRVI6IHN0cmluZztcclxuVmVyc2lvbk51bWJlci5TZXRWZXJzaW9uTnVtYmVyKEVYVEVOU0lPTl9BUElfVkVSU0lPTl9OVU1CRVIpO1xyXG5cclxuY29uc3QgZXh0ZW5zaW9uSW1wbCA9IG5ldyBFeHRlbnNpb25zSW1wbCgpO1xyXG5leHBvcnQgY29uc3QgZXh0ZW5zaW9ucyA9IG5ldyBFeHRlbnNpb25zKGV4dGVuc2lvbkltcGwpO1xyXG5cclxuLy8gRXhwb3J0IEVudW1zXHJcbi8vIFRoZXNlIHNob3cgdXAgdW5kZXIgdGhlIHRhYmxlYXUgb2JqZWN0LiBJLmUuIHRhYmxlYXUuRXh0ZW5zaW9uQ29udGV4dC5TZXJ2ZXJcclxuZXhwb3J0IHtcclxuICBFeHRlbnNpb25Db250ZXh0LFxyXG4gIEV4dGVuc2lvbk1vZGUsXHJcbiAgQW5hbHl0aWNzT2JqZWN0VHlwZSxcclxuICBDb2x1bW5UeXBlLFxyXG4gIERhc2hib2FyZE9iamVjdFR5cGUsXHJcbiAgRGF0YVR5cGUsXHJcbiAgRGF0ZVJhbmdlVHlwZSxcclxuICBEaWFsb2dFdmVudFR5cGUsXHJcbiAgRW5jb2RpbmdUeXBlLFxyXG4gIEVycm9yQ29kZXMsXHJcbiAgRmllbGRBZ2dyZWdhdGlvblR5cGUsXHJcbiAgRmllbGRSb2xlVHlwZSxcclxuICBGaWx0ZXJEb21haW5UeXBlLFxyXG4gIEZpbHRlclR5cGUsXHJcbiAgRmlsdGVyVXBkYXRlVHlwZSxcclxuICBGaWx0ZXJOdWxsT3B0aW9uLFxyXG4gIE1hcmtUeXBlLFxyXG4gIFBhcmFtZXRlclZhbHVlVHlwZSxcclxuICBQZXJpb2RUeXBlLFxyXG4gIFF1aWNrVGFibGVDYWxjVHlwZSxcclxuICBTZWxlY3Rpb25VcGRhdGVUeXBlLFxyXG4gIFNoZWV0VHlwZSxcclxuICBTb3J0RGlyZWN0aW9uLFxyXG4gIFRhYmxlYXVFdmVudFR5cGUsXHJcbiAgVHJlbmRMaW5lTW9kZWxUeXBlXHJcbn0gZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL0V4dGVuc2lvbnNBcGkudHNcbiAqKi8iLCJpbXBvcnQge1xyXG4gIEV4dGVuc2lvbkRhc2hib2FyZEluZm8sXHJcbiAgRXh0ZW5zaW9uU2V0dGluZ3NJbmZvLFxyXG4gIEludGVybmFsQXBpRGlzcGF0Y2hlcixcclxuICBJbnRlcm5hbEFwaURpc3BhdGNoZXJIb2xkZXIsXHJcbiAgU2hlZXRQYXRoLFxyXG59IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IEFwaVNlcnZpY2VSZWdpc3RyeSwgZG9Dcm9zc0ZyYW1lQm9vdHN0cmFwLCByZWdpc3RlckFsbFNoYXJlZFNlcnZpY2VzLCBWZXJzaW9uTnVtYmVyIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXNoYXJlZCc7XHJcbmltcG9ydCB7IFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRGFzaGJvYXJkIH0gZnJvbSAnLi4vRGFzaGJvYXJkJztcclxuaW1wb3J0IHsgRGFzaGJvYXJkQ29udGVudCB9IGZyb20gJy4uL05hbWVzcGFjZXMvRGFzaGJvYXJkQ29udGVudCc7XHJcbmltcG9ydCB7IEVudmlyb25tZW50IH0gZnJvbSAnLi4vTmFtZXNwYWNlcy9FbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSAnLi4vTmFtZXNwYWNlcy9TZXR0aW5ncyc7XHJcbmltcG9ydCB7IEV4dGVuc2lvbnNTZXJ2aWNlTmFtZXMgfSBmcm9tICcuLi9TZXJ2aWNlcy9FeHRlbnNpb25zU2VydmljZU5hbWVzJztcclxuaW1wb3J0IHsgSW5pdGlhbGl6YXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vU2VydmljZXMvSW5pdGlhbGl6YXRpb25TZXJ2aWNlJztcclxuaW1wb3J0IHsgcmVnaXN0ZXJBbGxFeHRlbnNpb25zU2VydmljZXMgfSBmcm9tICcuLi9TZXJ2aWNlcy9SZWdpc3RlckFsbEV4dGVuc2lvbnNTZXJ2aWNlcyc7XHJcbmltcG9ydCB7IERhc2hib2FyZEltcGwgfSBmcm9tICcuL0Rhc2hib2FyZEltcGwnO1xyXG5pbXBvcnQgeyBTZXR0aW5nc0ltcGwgfSBmcm9tICcuL1NldHRpbmdzSW1wbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRXh0ZW5zaW9uc0ltcGwge1xyXG4gIHByaXZhdGUgX2luaXRpYWxpemF0aW9uUHJvbWlzZTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgcHVibGljIGRhc2hib2FyZENvbnRlbnQ6IERhc2hib2FyZENvbnRlbnQ7XHJcbiAgcHVibGljIGVudmlyb25tZW50OiBFbnZpcm9ubWVudDtcclxuICBwdWJsaWMgc2V0dGluZ3M6IFNldHRpbmdzO1xyXG5cclxuICBwdWJsaWMgaW5pdGlhbGl6ZUFzeW5jKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKCF0aGlzLl9pbml0aWFsaXphdGlvblByb21pc2UpIHtcclxuICAgICAgdGhpcy5faW5pdGlhbGl6YXRpb25Qcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIC8vIEZpcnN0IHRoaW5nIHdlIHdhbnQgdG8gZG8gaXMgY2hlY2sgdG8gc2VlIGlmIHRoZXJlIGlzIGEgZGVza3RvcCBkaXNwYXRjaGVyIGFscmVhZHkgcmVnaXN0ZXJlZCBmb3IgdXNcclxuICAgICAgICBpZiAoSW50ZXJuYWxBcGlEaXNwYXRjaGVySG9sZGVyLmhhc0Rlc2t0b3BBcGlEaXNwYXRjaGVyUHJvbWlzZSgpKSB7XHJcbiAgICAgICAgICAvLyBSdW5uaW5nIGluIGRlc2t0b3AsIHVzZSB0aGlzIHByb21pc2VcclxuICAgICAgICAgIGNvbnN0IGRlc2t0b3BEaXNwYXRjaGVyUHJvbWlzZSA9IEludGVybmFsQXBpRGlzcGF0Y2hlckhvbGRlci5nZXREZXNrdG9wRGlzcGF0Y2hlclByb21pc2UoKTtcclxuICAgICAgICAgIGRlc2t0b3BEaXNwYXRjaGVyUHJvbWlzZS50aGVuKHRoaXMub25EaXNwYXRjaGVyUmVjZWl2ZWQuYmluZCh0aGlzKSkudGhlbigoKSA9PiB7IHJlc29sdmUoKTsgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIFdlIG11c3QgYmUgcnVubmluZyBpbiBzZXJ2ZXIsIHNvIHdlIHNob3VsZCB0cnkgdG8ga2ljayBvZiB0aGUgc2VydmVyIGRpc3BhdGNoZXIgYm9vdHN0cmFwcGluZ1xyXG4gICAgICAgICAgZG9Dcm9zc0ZyYW1lQm9vdHN0cmFwKHdpbmRvdywgVmVyc2lvbk51bWJlci5JbnN0YW5jZSkudGhlbih0aGlzLm9uRGlzcGF0Y2hlclJlY2VpdmVkLmJpbmQodGhpcykpLnRoZW4oKCkgPT4geyByZXNvbHZlKCk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2luaXRpYWxpemF0aW9uUHJvbWlzZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25EaXNwYXRjaGVyUmVjZWl2ZWQoZGlzcGF0Y2hlcjogSW50ZXJuYWxBcGlEaXNwYXRjaGVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBkaXNwYXRjaGVyLnNldFZlcnNpb25OdW1iZXIoVmVyc2lvbk51bWJlci5JbnN0YW5jZSk7XHJcblxyXG4gICAgLy8gQ2FsbCB0byByZWdpc3RlciBhbGwgdGhlIHNlcnZpY2VzIHdoaWNoIHdpbGwgdXNlIHRoZSBuZXdseSBpbml0aWFsaXplZCBkaXNwYXRjaGVyXHJcbiAgICByZWdpc3RlckFsbFNoYXJlZFNlcnZpY2VzKGRpc3BhdGNoZXIpO1xyXG4gICAgcmVnaXN0ZXJBbGxFeHRlbnNpb25zU2VydmljZXMoZGlzcGF0Y2hlcik7XHJcblxyXG4gICAgLy8gR2V0IHRoZSBpbml0aWFsaXphdGlvbiBzZXJ2aWNlIGFuZCBpbml0aWFsaXplIHRoaXMgZXh0ZW5zaW9uXHJcbiAgICBjb25zdCBpbml0aWFsaXphdGlvblNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxJbml0aWFsaXphdGlvblNlcnZpY2U+KFxyXG4gICAgICBFeHRlbnNpb25zU2VydmljZU5hbWVzLkluaXRpYWxpemF0aW9uU2VydmljZSk7XHJcblxyXG4gICAgcmV0dXJuIGluaXRpYWxpemF0aW9uU2VydmljZS5pbml0aWFsaXplRGFzaGJvYXJkRXh0ZW5zaW9uc0FzeW5jKCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICBpZiAoIXJlc3VsdC5leHRlbnNpb25JbnN0YW5jZS5sb2NhdG9yLmRhc2hib2FyZFBhdGgpIHtcclxuICAgICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmlzVW5kZWZpbmVkKFsnRGFzaGJvYXJkUGF0aCddKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5kYXNoYm9hcmRDb250ZW50ID0gdGhpcy5pbml0aWFsaXplRGFzaGJvYXJkQ29udGVudChyZXN1bHQuZXh0ZW5zaW9uRGFzaGJvYXJkSW5mbyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZXh0ZW5zaW9uSW5zdGFuY2UubG9jYXRvci5kYXNoYm9hcmRQYXRoKTtcclxuICAgICAgdGhpcy5lbnZpcm9ubWVudCA9IG5ldyBFbnZpcm9ubWVudChyZXN1bHQuZXh0ZW5zaW9uRW52aXJvbm1lbnQpO1xyXG4gICAgICB0aGlzLnNldHRpbmdzID0gdGhpcy5pbml0aWFsaXplU2V0dGluZ3MocmVzdWx0LmV4dGVuc2lvblNldHRpbmdzSW5mbyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZURhc2hib2FyZENvbnRlbnQoaW5mbzogRXh0ZW5zaW9uRGFzaGJvYXJkSW5mbywgc2hlZXRQYXRoOiBTaGVldFBhdGgpOiBEYXNoYm9hcmRDb250ZW50IHtcclxuICAgIGNvbnN0IGRhc2hib2FyZEltcGwgPSBuZXcgRGFzaGJvYXJkSW1wbChpbmZvLCBzaGVldFBhdGgpO1xyXG4gICAgY29uc3QgZGFzaGJvYXJkID0gbmV3IERhc2hib2FyZChkYXNoYm9hcmRJbXBsKTtcclxuICAgIHJldHVybiBuZXcgRGFzaGJvYXJkQ29udGVudChkYXNoYm9hcmQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0aWFsaXplU2V0dGluZ3Moc2V0dGluZ3NJbmZvOiBFeHRlbnNpb25TZXR0aW5nc0luZm8pOiBTZXR0aW5ncyB7XHJcbiAgICBjb25zdCBzZXR0aW5nc0ltcGwgPSBuZXcgU2V0dGluZ3NJbXBsKHNldHRpbmdzSW5mbyk7XHJcbiAgICByZXR1cm4gbmV3IFNldHRpbmdzKHNldHRpbmdzSW1wbCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9JbnRlcm5hbC9FeHRlbnNpb25zSW1wbC50c1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIHlvdXIgbWFpbi4gVGhpcyBpcyB3aGVyZSB5b3UgcmUtZXhwb3J0IGV2ZXJ5dGhpbmcgeW91IHdhbnQgdG8gYmUgcHVibGljbHkgYXZhaWxhYmxlLlxyXG4gKlxyXG4gKiBUaGUgYnVpbGQgZW5mb3JjZXMgdGhhdCB0aGUgZmlsZSBoYXMgdGhlIHNhbWUgbmFtZSBhcyB0aGUgZ2xvYmFsIHZhcmlhYmxlIHRoYXQgaXMgZXhwb3J0ZWQuXHJcbiAqL1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvRW51bXMnO1xyXG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9JbnRlcm5hbEFwaURpc3BhdGNoZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9Nb2RlbHMnO1xyXG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9Ob3RpZmljYXRpb25zJztcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvUGFyYW1ldGVycyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL1ZlcmJzJztcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvVmVyc2lvbk51bWJlcic7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLWludGVybmFsLWNvbnRyYWN0L3NyYy9BcGlJbnRlcm5hbENvbnRyYWN0LnRzXG4gKiovIiwiZXhwb3J0IGVudW0gRXh0ZW5zaW9uQ29udGV4dCB7XHJcbiAgRGVza3RvcCA9ICdkZXNrdG9wJyxcclxuICBTZXJ2ZXIgPSAnc2VydmVyJyxcclxuICBVbmtub3duID0gJ3Vua25vd24nXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEV4dGVuc2lvbk1vZGUge1xyXG4gIEF1dGhvcmluZyA9ICdhdXRob3JpbmcnLFxyXG4gIFZpZXdpbmcgPSAndmlld2luZycsXHJcbiAgVW5rbm93biA9ICd1bmtub3duJ1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBDb2x1bW5UeXBlIHtcclxuICBEaXNjcmV0ZSA9ICdkaXNjcmV0ZScsXHJcbiAgQ29udGludW91cyA9ICdjb250aW51b3VzJ1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBEYXNoYm9hcmRPYmplY3RUeXBlIHtcclxuICBCbGFuayA9ICdibGFuaycsXHJcbiAgV29ya3NoZWV0ID0gJ3dvcmtzaGVldCcsXHJcbiAgUXVpY2tGaWx0ZXIgPSAncXVpY2stZmlsdGVyJyxcclxuICBQYXJhbWV0ZXJDb250cm9sID0gJ3BhcmFtZXRlci1jb250cm9sJyxcclxuICBQYWdlRmlsdGVyID0gJ3BhZ2UtZmlsdGVyJyxcclxuICBMZWdlbmQgPSAnbGVnZW5kJyxcclxuICBUaXRsZSA9ICd0aXRsZScsXHJcbiAgVGV4dCA9ICd0ZXh0JyxcclxuICBJbWFnZSA9ICdpbWFnZScsXHJcbiAgV2ViUGFnZSA9ICd3ZWItcGFnZScsXHJcbiAgRXh0ZW5zaW9uID0gJ2V4dGVuc2lvbidcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRGF0YVR5cGUge1xyXG4gIFN0cmluZyA9ICdzdHJpbmcnLFxyXG4gIEludCA9ICdpbnQnLFxyXG4gIEZsb2F0ID0gJ2Zsb2F0JyxcclxuICBCb29sID0gJ2Jvb2wnLFxyXG4gIERhdGUgPSAnZGF0ZScsXHJcbiAgRGF0ZVRpbWUgPSAnZGF0ZS10aW1lJyxcclxuICBTcGF0aWFsID0gJ3NwYXRpYWwnXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVuY29kZWREYXRhVHlwZSB7XHJcbiAgTnVtYmVyID0gJ251bWJlcicsXHJcbiAgU3RyaW5nID0gJ3N0cmluZycsXHJcbiAgRGF0ZSA9ICdkYXRlJyxcclxuICBCb29sZWFuID0gJ2Jvb2xlYW4nXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVycm9yQ29kZSB7XHJcbiAgU2VydmVyRXJyb3IgPSAnc2VydmVyLWVycm9yJyxcclxuICBJbnZhbGlkQWdncmVnYXRpb25GaWVsZE5hbWUgPSAnaW52YWxpZC1hZ2dyZWdhdGlvbi1maWVsZC1uYW1lJyxcclxuICBJbnZhbGlkRmlsdGVyRmllbGROYW1lID0gJ2ludmFsaWQtZmlsdGVyLWZpZWxkbmFtZScsXHJcbiAgSW52YWxpZEZpbHRlckZpZWxkVmFsdWUgPSAnaW52YWxpZC1maWx0ZXItZmllbGQtdmFsdWUnXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEZpZWxkQWdncmVnYXRpb25UeXBlIHtcclxuICBTdW0gPSAnc3VtJyxcclxuICBBdmcgPSAnYXZnJyxcclxuICBNaW4gPSAnbWluJyxcclxuICBNYXggPSAnbWF4JyxcclxuICBTdGRldiA9ICdzdGRldicsXHJcbiAgU3RkZXZwID0gJ3N0ZGV2cCcsXHJcbiAgVmFyID0gJ3ZhcicsXHJcbiAgVmFycCA9ICd2YXJwJyxcclxuICBDb3VudCA9ICdjb3VudCcsXHJcbiAgQ291bnRkID0gJ2NvdW50ZCcsXHJcbiAgTWVkaWFuID0gJ21lZGlhbicsXHJcbiAgQXR0ciA9ICdhdHRyJyxcclxuICBOb25lID0gJ25vbmUnLFxyXG4gIFllYXIgPSAneWVhcicsXHJcbiAgUXRyID0gJ3F0cicsXHJcbiAgTW9udGggPSAnbW9udGgnLFxyXG4gIERheSA9ICdkYXknLFxyXG4gIEhvdXIgPSAnaG91cicsXHJcbiAgTWludXRlID0gJ21pbnV0ZScsXHJcbiAgU2Vjb25kID0gJ3NlY29uZCcsXHJcbiAgV2VlayA9ICd3ZWVrJyxcclxuICBXZWVrZGF5ID0gJ3dlZWtkYXknLFxyXG4gIE1vbnRoWWVhciA9ICdtb250aC15ZWFyJyxcclxuICBNZHkgPSAnbWR5JyxcclxuICBFbmQgPSAnZW5kJyxcclxuICBUcnVuY1llYXIgPSAndHJ1bmMteWVhcicsXHJcbiAgVHJ1bmNRdHIgPSAndHJ1bmMtcXRyJyxcclxuICBUcnVuY01vbnRoID0gJ3RydW5jLW1vbnRoJyxcclxuICBUcnVuY1dlZWsgPSAndHJ1bmMtd2VlaycsXHJcbiAgVHJ1bmNEYXkgPSAndHJ1bmMtZGF5JyxcclxuICBUcnVuY0hvdXIgPSAndHJ1bmMtaG91cicsXHJcbiAgVHJ1bmNNaW51dGUgPSAndHJ1bmMtbWludXRlJyxcclxuICBUcnVuY1NlY29uZCA9ICd0cnVuYy1zZWNvbmQnLFxyXG4gIFF1YXJ0MSA9ICdxdWFydDEnLFxyXG4gIFF1YXJ0MyA9ICdxdWFydDMnLFxyXG4gIFNrZXduZXNzID0gJ3NrZXduZXNzJyxcclxuICBLdXJ0b3NpcyA9ICdrdXJ0b3NpcycsXHJcbiAgSW5PdXQgPSAnaW4tb3V0JyxcclxuICBVc2VyID0gJ3VzZXInXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEZpZWxkUm9sZVR5cGUge1xyXG4gIERpbWVuc2lvbiA9ICdkaW1lbnNpb24nLFxyXG4gIE1lYXN1cmUgPSAnbWVhc3VyZScsXHJcbiAgVW5rbm93biA9ICd1bmtub3duJ1xyXG59XHJcblxyXG4vKipcclxuICogIFRoZSBkaWZmZXJlbnQgdXBkYXRlIHR5cGVzIGZvciBhcHBseWluZyBmaWx0ZXIuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBGaWx0ZXJVcGRhdGVUeXBlIHtcclxuICBBZGQgPSAnYWRkJyxcclxuICBBbGwgPSAnYWxsJyxcclxuICBSZXBsYWNlID0gJ3JlcGxhY2UnLFxyXG4gIFJlbW92ZSA9ICdyZW1vdmUnXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFNoZWV0VHlwZSB7XHJcbiAgRGFzaGJvYXJkID0gJ2Rhc2hib2FyZCcsXHJcbiAgU3RvcnkgPSAnc3RvcnknLFxyXG4gIFdvcmtzaGVldCA9ICd3b3Jrc2hlZXQnXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIERvbWFpblJlc3RyaWN0aW9uVHlwZSB7XHJcbiAgQWxsID0gJ2FsbCcsXHJcbiAgTGlzdCA9ICdsaXN0JyxcclxuICBSYW5nZSA9ICdyYW5nZSdcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRGF0ZVN0ZXBQZXJpb2Qge1xyXG4gIFllYXJzID0gJ3llYXJzJyxcclxuICBRdWFydGVycyA9ICdxdWFydGVycycsXHJcbiAgTW9udGhzID0gJ21vbnRocycsXHJcbiAgV2Vla3MgPSAnd2Vla3MnLFxyXG4gIERheXMgPSAnZGF5cycsXHJcbiAgSG91cnMgPSAnaG91cnMnLFxyXG4gIE1pbnV0ZXMgPSAnbWludXRlcycsXHJcbiAgU2Vjb25kcyA9ICdzZWNvbmRzJ1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIG9wdGlvbiBmb3Igc3BlY2lmeWluZyB3aGljaCB2YWx1ZXMgdG8gaW5jbHVkZSBmb3IgZmlsdGVyaW5nLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gRmlsdGVyTnVsbE9wdGlvbiB7XHJcbiAgTnVsbFZhbHVlcyA9ICdudWxsdmFsdWVzJyxcclxuICBOb25OdWxsVmFsdWVzID0gJ25vbm51bGx2YWx1ZXMnLFxyXG4gIEFsbFZhbHVlcyA9ICdhbGx2YWx1ZXMnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgdHlwZSBvZiBmaWx0ZXIgZG9tYWluXHJcbiAqL1xyXG5leHBvcnQgZW51bSBGaWx0ZXJEb21haW5UeXBlIHtcclxuICBSZWxldmFudCA9ICdyZWxldmFudCcsXHJcbiAgRGF0YWJhc2UgPSAnZGF0YWJhc2UnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnRlcm5hbCBlbnVtIGZvciBzcGVjaWZ5aW5nIHRoZSBzZWxlY3Rpb24gdHlwZSBmb3Igc2VsZWN0IG1hcmtzIGFwaS5cclxuICovXHJcbmV4cG9ydCBlbnVtIFNlbGVjdGlvblVwZGF0ZVR5cGUge1xyXG4gIFJlcGxhY2UgPSAnc2VsZWN0LXJlcGxhY2UnLFxyXG4gIEFkZCA9ICdzZWxlY3QtYWRkJyxcclxuICBSZW1vdmUgPSAnc2VsZWN0LXJlbW92ZSdcclxufVxyXG5cclxuLyoqXHJcbiAqIEludGVybmFsIGVudW0gZm9yIHNwZWNpZnlpbmcgdGhlIGluY2x1ZGVkIHZhbHVlcyB0eXBlIGZvciByYW5nZSBzZWxlY3Rpb24uXHJcbiAqL1xyXG5leHBvcnQgZW51bSBRdWFudGl0YXRpdmVJbmNsdWRlZFZhbHVlcyB7XHJcbiAgSW5jbHVkZU51bGwgPSAnaW5jbHVkZS1udWxsJyxcclxuICBJbmNsdWRlTm9uTnVsbCA9ICdpbmNsdWRlLW5vbi1udWxsJyxcclxuICBJbmNsdWRlQWxsID0gJ2luY2x1ZGUtYWxsJ1xyXG59XHJcblxyXG4vKipcclxuICogVHlwZSBvZiBtYXJrIGZvciBhIGdpdmVuIG1hcmtzIGNhcmQgaW4gYSB2aXouXHJcbiAqL1xyXG5leHBvcnQgZW51bSBNYXJrVHlwZSB7XHJcbiAgICBCYXIgPSAnYmFyJyxcclxuICAgIExpbmUgPSAnbGluZScsXHJcbiAgICBBcmVhID0gJ2FyZWEnLFxyXG4gICAgU3F1YXJlID0gJ3NxdWFyZScsXHJcbiAgICBDaXJjbGUgPSAnY2lyY2xlJyxcclxuICAgIFNoYXBlID0gJ3NoYXBlJyxcclxuICAgIFRleHQgPSAndGV4dCcsXHJcbiAgICBNYXAgPSAnbWFwJyxcclxuICAgIFBpZSA9ICdwaWUnLFxyXG4gICAgR2FudHRCYXIgPSAnZ2FudHQtYmFyJyxcclxuICAgIFBvbHlnb24gPSAncG9seWdvbicsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbnRlcm5hbCBlbnVtIGZvciBzcGVjaWZ5aW5nIHRoZSB0eXBlIG9mIGZpbHRlclxyXG4gKi9cclxuZXhwb3J0IGVudW0gRmlsdGVyVHlwZSB7XHJcbiAgQ2F0ZWdvcmljYWwgPSAnY2F0ZWdvcmljYWwnLFxyXG4gIFJhbmdlID0gJ3JhbmdlJyxcclxuICBSZWxhdGl2ZURhdGUgPSAncmVsYXRpdmVEYXRlJyxcclxuICBIaWVyYXJjaGljYWwgPSAnaGllcmFyY2hpY2FsJ1xyXG59XHJcblxyXG4vKipcclxuICogSW50ZXJuYWwgZW51bSBmb3Igc3BlY2lmeWluZyB0aGUgRGF0ZVJhbmdlVHlwZSBvZiBhIHJlbGF0aXZlIGRhdGUgZmlsdGVyXHJcbiAqL1xyXG5leHBvcnQgZW51bSBEYXRlUmFuZ2VUeXBlIHtcclxuICAvKipcclxuICAgKiBSZWZlcnMgdG8gdGhlIGxhc3QgZGF5LCB3ZWVrLCBtb250aCwgZXRjLiBvZiB0aGUgZGF0ZSBwZXJpb2QuXHJcbiAgICovXHJcbiAgTGFzdCA9ICdsYXN0JyxcclxuICAvKipcclxuICAgKiBSZWZlcnMgdG8gdGhlIGxhc3QgTiBkYXlzLCB3ZWVrcywgbW9udGhzLCBldGMuIG9mIHRoZSBkYXRlIHBlcmlvZC5cclxuICAgKi9cclxuICBMYXN0TiA9ICdsYXN0TicsXHJcbiAgLyoqXHJcbiAgICogUmVmZXJzIHRvIHRoZSBuZXh0IGRheSwgd2VlaywgbW9udGgsIGV0Yy4gb2YgdGhlIGRhdGUgcGVyaW9kLlxyXG4gICAqL1xyXG4gIE5leHQgPSAnbmV4dCcsXHJcbiAgLyoqXHJcbiAgICogUmVmZXJzIHRvIHRoZSBuZXh0IE4gZGF5cywgd2Vla3MsIG1vbnRocywgZXRjLiBvZiB0aGUgZGF0ZSBwZXJpb2QuXHJcbiAgICovXHJcbiAgTmV4dE4gPSAnbmV4dE4nLFxyXG4gIC8qKlxyXG4gICAqIFJlZmVycyB0byB0aGUgY3VycmVudCBkYXksIHdlZWssIG1vbnRoLCBldGMuIG9mIHRoZSBkYXRlIHBlcmlvZC5cclxuICAgKi9cclxuICBDdXJyZW50ID0gJ2N1cnJlbnQnLFxyXG4gIC8qKlxyXG4gICAqIFJlZmVycyB0byBldmVyeXRoaW5nIHVwIHRvIGFuZCBpbmNsdWRpbmcgdGhlIGN1cnJlbnQgZGF5LCB3ZWVrLCBtb250aCwgZXRjLiBvZiB0aGUgZGF0ZSBwZXJpb2QuXHJcbiAgICovXHJcbiAgVG9EYXRlID0gJ3RvRGF0ZSdcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvanMtYXBpL2FwaS1pbnRlcm5hbC1jb250cmFjdC9zcmMvaW50ZXJmYWNlL0VudW1zLnRzXG4gKiovIiwiaW1wb3J0IHsgTW9kZWwgfSBmcm9tICcuL01vZGVscyc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbklkIH0gZnJvbSAnLi9Ob3RpZmljYXRpb25zJztcclxuaW1wb3J0IHsgVmVyYklkIH0gZnJvbSAnLi9WZXJicyc7XHJcbmltcG9ydCB7IFZlcnNpb25OdW1iZXIgfSBmcm9tICcuL1ZlcnNpb25OdW1iZXInO1xyXG5cclxuZXhwb3J0IHR5cGUgTm90aWZpY2F0aW9uSGFuZGxlciA9IChub3RpZmljYXRpb246IE5vdGlmaWNhdGlvbikgPT4gdm9pZDtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXhlY3V0ZVBhcmFtZXRlcnMge1xyXG4gIFtrZXk6IHN0cmluZ106IE1vZGVsO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEV4ZWN1dGVSZXNwb25zZSB7XHJcbiAgcmVzdWx0OiBNb2RlbDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBOb3RpZmljYXRpb24ge1xyXG4gIG5vdGlmaWNhdGlvbklkOiBOb3RpZmljYXRpb25JZDtcclxuICBkYXRhOiBNb2RlbDtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJbnRlcm5hbEFwaURpc3BhdGNoZXIge1xyXG4gIHNldFZlcnNpb25OdW1iZXIodmVyc2lvbk51bWJlcjogVmVyc2lvbk51bWJlcik6IHZvaWQ7XHJcbiAgZXhlY3V0ZSh2ZXJiOiBWZXJiSWQsIHBhcmFtZXRlcnM6IEV4ZWN1dGVQYXJhbWV0ZXJzKTogUHJvbWlzZTxFeGVjdXRlUmVzcG9uc2U+O1xyXG4gIHJlZ2lzdGVyTm90aWZpY2F0aW9uSGFuZGxlcihoYW5kbGVyOiBOb3RpZmljYXRpb25IYW5kbGVyKTogdm9pZDtcclxuICB1bnJlZ2lzdGVyTm90aWZpY2F0aW9uSGFuZGxlcihoYW5kbGVyOiBOb3RpZmljYXRpb25IYW5kbGVyKTogdm9pZDtcclxufVxyXG5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gIGludGVyZmFjZSBXaW5kb3cgeyBfX3RhYmxlYXVEZXNrdG9wRGlzcGF0Y2hlcjogUHJvbWlzZTxJbnRlcm5hbEFwaURpc3BhdGNoZXI+OyB9XHJcbn1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgSW50ZXJuYWxBcGlEaXNwYXRjaGVySG9sZGVyIHtcclxuICBleHBvcnQgZnVuY3Rpb24gZ2V0RGVza3RvcERpc3BhdGNoZXJQcm9taXNlKCk6IFByb21pc2U8SW50ZXJuYWxBcGlEaXNwYXRjaGVyPiB7XHJcbiAgICByZXR1cm4gd2luZG93Ll9fdGFibGVhdURlc2t0b3BEaXNwYXRjaGVyO1xyXG4gIH1cclxuXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGhhc0Rlc2t0b3BBcGlEaXNwYXRjaGVyUHJvbWlzZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhIUludGVybmFsQXBpRGlzcGF0Y2hlckhvbGRlci5nZXREZXNrdG9wRGlzcGF0Y2hlclByb21pc2UoKTtcclxuICB9XHJcblxyXG4gIGV4cG9ydCBmdW5jdGlvbiBzZXREZXNrdG9wRGlzcGF0Y2hlclByb21pc2UoZGlzcGF0Y2hlcjogUHJvbWlzZTxJbnRlcm5hbEFwaURpc3BhdGNoZXI+KTogdm9pZCB7XHJcbiAgICB3aW5kb3cuX190YWJsZWF1RGVza3RvcERpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvanMtYXBpL2FwaS1pbnRlcm5hbC1jb250cmFjdC9zcmMvaW50ZXJmYWNlL0ludGVybmFsQXBpRGlzcGF0Y2hlci50c1xuICoqLyIsImV4cG9ydCBlbnVtIE5vdGlmaWNhdGlvbklkIHtcclxuICBTZWxlY3RlZE1hcmtzQ2hhbmdlZCA9ICdzZWxlY3RlZC1tYXJrcy1jaGFuZ2VkJyxcclxuICBQYXJhbWV0ZXJDaGFuZ2VkID0gJ3BhcmFtZXRlci1jaGFuZ2VkJyxcclxuICBGaWx0ZXJDaGFuZ2VkID0gJ2ZpbHRlci1jaGFuZ2VkJ1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLWludGVybmFsLWNvbnRyYWN0L3NyYy9pbnRlcmZhY2UvTm90aWZpY2F0aW9ucy50c1xuICoqLyIsImV4cG9ydCBlbnVtIFBhcmFtZXRlcklkIHtcclxuICBFeHRlbnNpb25Mb2NhdG9yID0gJ2V4dGVuc2lvbi1sb2NhdG9yJyxcclxuICBFeHRlbnNpb25Cb290c3RyYXBJbmZvID0gJ2V4dGVuc2lvbi1ib290c3RyYXAtaW5mbycsXHJcbiAgRXh0ZW5zaW9uU2V0dGluZ3NJbmZvID0gJ2V4dGVuc2lvbi1zZXR0aW5ncy1pbmZvJyxcclxuICBWaXN1YWxJZCA9ICd2aXN1YWwtaWQnLFxyXG4gIFNoZWV0UGF0aCA9ICdzaGVldC1wYXRoJyxcclxuICBJZ25vcmVBbGlhc2VzID0gJ2lnbm9yZS1hbGlhc2VzJyxcclxuICBJZ25vcmVTZWxlY3Rpb24gPSAnaWdub3JlLXNlbGVjdGlvbicsXHJcbiAgSW5jbHVkZUFsbENvbHVtbnMgPSAnaW5jbHVkZS1hbGwtY29sdW1ucycsXHJcbiAgTWF4Um93cyA9ICdtYXgtcm93cycsXHJcbiAgVW5kZXJseWluZ0RhdGFUYWJsZSA9ICd1bmRlcmx5aW5nLWRhdGEtdGFibGUnLFxyXG4gIFVuZGVybHlpbmdTdW1tYXJ5RGF0YVRhYmxlID0gJ3VuZGVybHlpbmctc3VtbWFyeS1kYXRhLXRhYmxlJyxcclxuICBEYXRhU291cmNlRGF0YVRhYmxlID0gJ2RhdGEtc291cmNlLWRhdGEtdGFibGUnLFxyXG4gIFNldHRpbmdzVmFsdWVzID0gJ3NldHRpbmdzLXZhbHVlcycsXHJcbiAgU2VsZWN0ZWREYXRhID0gJ3NlbGVjdGVkLWRhdGEnLFxyXG4gIEhpZ2hsaWdodGVkRGF0YSA9ICdoaWdobGlnaHRlZC1kYXRhJyxcclxuXHJcbiAgIC8vIEZpbHRlciBQYXJhbXNcclxuICBGaWVsZE5hbWUgPSAnZmllbGQtbmFtZScsXHJcbiAgRmlsdGVyVmFsdWVzID0gJ2ZpbHRlci12YWx1ZXMnLFxyXG4gIEZpbHRlclVwZGF0ZVR5cGUgPSAnZmlsdGVyLXVwZGF0ZS10eXBlJyxcclxuICBJc0V4Y2x1ZGVNb2RlID0gJ2lzLWV4Y2x1ZGUnLFxyXG4gIEZpbHRlclJhbmdlTWluID0gJ2ZpbHRlci1yYW5nZS1taW4nLFxyXG4gIEZpbHRlclJhbmdlTWF4ID0gJ2ZpbHRlci1yYW5nZS1tYXgnLFxyXG4gIEZpbHRlclJhbmdlTnVsbE9wdGlvbiA9ICdmaWx0ZXItcmFuZ2UtbnVsbC1vcHRpb24nLFxyXG4gIFdvcmtzaGVldEZpbHRlcnMgPSAnd29ya3NoZWV0LWZpbHRlcnMnLFxyXG4gIEZpZWxkSWQgPSAnZmllbGQtaWQnLFxyXG4gIERvbWFpblR5cGUgPSAnZG9tYWluLXR5cGUnLFxyXG4gIENhdGVnb3JpY2FsRG9tYWluID0gJ2NhdGVnb3JpY2FsLWRvbWFpbicsXHJcbiAgUXVhbnRpdGF0aXZlRG9tYWluID0gJ3F1YW50aXRhdGl2ZS1kbWFpbicsXHJcblxyXG4gIFdvcmtzaGVldE5hbWUgPSAnd29ya3NoZWV0LW5hbWUnLFxyXG4gIERhc2hib2FyZE5hbWUgPSAnZGFzaGJvYXJkJyxcclxuXHJcbiAgUGFyYW1ldGVySW5mbyA9ICdwYXJhbWV0ZXItaW5mbycsXHJcbiAgUGFyYW1ldGVySW5mb3MgPSAncGFyYW1ldGVyLWluZm9zJyxcclxuICBQYXJhbWV0ZXJDYXB0aW9uID0gJ3BhcmVtZXRlci1jYXB0aW9uJyxcclxuICBQYXJhbWV0ZXJGaWVsZE5hbWUgPSAncGFyYW1ldGVyLWZpZWxkLW5hbWUnLFxyXG4gIFBhcmFtZXRlclZhbHVlID0gJ3BhcmFtZXRlci12YWx1ZScsXHJcbiAgU2VsZWN0aW9uID0gJ3NlbGVjdGlvbicsXHJcbiAgU2VsZWN0aW9uVXBkYXRlVHlwZSA9ICdzZWxlY3Rpb25VcGRhdGVUeXBlJyxcclxuICBIaWVyVmFsU2VsZWN0aW9uTW9kZWxzID0gJ2hpZXJhcmNoaWNhbFZhbHVlU2VsZWN0aW9uTW9kZWxzJyxcclxuICBRdWFudFJhbmdlU2VsZWN0aW9uTW9kZWxzID0gJ3F1YW50YXRpdmVSYW5nZVNlbGVjdGlvbk1vZGVscycsXHJcbiAgRGltVmFsU2VsZWN0aW9uTW9kZWxzID0gJ2RpbWVuc2lvblZhbHVlU2VsZWN0aW9uTW9kZWxzJyxcclxuXHJcbiAgRGF0YVNvdXJjZUlkID0gJ2RhdGEtc291cmNlLWlkJyxcclxuICBEYXRhU2NoZW1hID0gJ2RhdGEtc2NoZW1hJyxcclxuICBEYXRhU291cmNlTmFtZSA9ICdkYXRhLXNvdXJjZS1uYW1lJyxcclxuICBDb2x1bW5zVG9JbmNsdWRlID0gJ2NvbHVtbnMtdG8taW5jbHVkZScsXHJcbiAgSm9pbkRlc2NyaXB0aW9uID0gJ2pvaW4tZGVzY3JpcHRpb24nLFxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLWludGVybmFsLWNvbnRyYWN0L3NyYy9pbnRlcmZhY2UvUGFyYW1ldGVycy50c1xuICoqLyIsIi8vIERlY2xhcmUgdGhpcyBrZXkgdHlwZSBhbmQgZXhwb3J0IHRoZSBOb3RpZmljYXRpb25JZCB0byBtYWtlIHRoaXMgYmVoYXZlIGxpa2UgYSBzdHJpbmcgZW51bVxyXG5leHBvcnQgZW51bSBWZXJiSWQge1xyXG4gIEFwcGx5Q2F0ZWdvcmljYWxGaWx0ZXIgPSAnY2F0ZWdvcmljYWwtZmlsdGVyJyxcclxuICBBcHBseVJhbmdlRmlsdGVyID0gJ3JhbmdlLWZpbHRlcicsXHJcbiAgQ2xlYXJGaWx0ZXIgPSAnY2xlYXItZmlsdGVyJyxcclxuICBJbml0aWFsaXplRXh0ZW5zaW9uID0gJ2luaXRpYWxpemUtZXh0ZW5zaW9uJyxcclxuICBHZXREYXRhU3VtbWFyeURhdGEgPSAnZ2V0LXN1bW1hcnktZGF0YScsXHJcbiAgR2V0VW5kZXJseWluZ0RhdGEgPSAnZ2V0LXVuZGVybHlpbmctZGF0YScsXHJcbiAgR2V0RGF0YVNvdXJjZURhdGEgPSAnZ2V0LWRhdGFzb3VyY2UtZGF0YScsXHJcbiAgU2F2ZUV4dGVuc2lvblNldHRpbmdzID0gJ3NhdmUtZXh0ZW5zaW9uLXNldHRpbmdzJyxcclxuICBHZXRTZWxlY3RlZE1hcmtzID0gJ2dldC1zZWxlY3RlZC1tYXJrcycsXHJcbiAgR2V0SGlnaGxpZ2h0ZWRNYXJrcyA9ICdnZXQtaGlnaGxpZ2h0ZWQtbWFya3MnLFxyXG4gIEdldFBhcmFtZXRlcnNGb3JTaGVldCA9ICdnZXQtcGFyYW1ldGVycy1mb3Itc2hlZXQnLFxyXG4gIEZpbmRQYXJhbWV0ZXIgPSAnZmluZC1wYXJhbWV0ZXInLFxyXG4gIENoYW5nZVBhcmFtZXRlclZhbHVlID0gJ2NoYW5nZS1wYXJhbWV0ZXItdmFsdWUnLFxyXG4gIENsZWFyU2VsZWN0ZWRNYXJrcyA9ICdjbGVhci1zZWxlY3RlZC1tYXJrcycsXHJcbiAgU2VsZWN0QnlWYWx1ZSA9ICdzZWxlY3QtYnktdmFsdWUnLFxyXG4gIEdldERhdGFTb3VyY2VzID0gJ2dldC1kYXRhLXNvdXJjZXMnLFxyXG4gIFJlZnJlc2hEYXRhU291cmNlID0gJ3JlZnJlc2gtZGF0YS1zb3VyY2UnLFxyXG4gIEdldEZpbHRlcnMgPSAnZ2V0LWZpbHRlcnMnLFxyXG4gIEdldENhdGVnb3JpY2FsRG9tYWluID0gJ2dldC1jYXRlZ29yaWNhbC1kb21haW4nLFxyXG4gIEdldFJhbmdlRG9tYWluID0gJ2dldC1yYW5nZS1kb21haW4nLFxyXG4gIEdldEpvaW5EZXNjcmlwdGlvbiA9ICdnZXQtam9pbi1kZXNjcmlwdGlvbidcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvanMtYXBpL2FwaS1pbnRlcm5hbC1jb250cmFjdC9zcmMvaW50ZXJmYWNlL1ZlcmJzLnRzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgeW91ciBtYWluLiBUaGlzIGlzIHdoZXJlIHlvdSByZS1leHBvcnQgZXZlcnl0aGluZyB5b3Ugd2FudCB0byBiZSBwdWJsaWNseSBhdmFpbGFibGUuXHJcbiAqXHJcbiAqIFRoZSBidWlsZCBlbmZvcmNlcyB0aGF0IHRoZSBmaWxlIGhhcyB0aGUgc2FtZSBuYW1lIGFzIHRoZSBnbG9iYWwgdmFyaWFibGUgdGhhdCBpcyBleHBvcnRlZC5cclxuICovXHJcblxyXG5leHBvcnQgKiBmcm9tICcuL0V2ZW50TGlzdGVuZXJNYW5hZ2VyJztcclxuZXhwb3J0ICogZnJvbSAnLi9QYXJhbWV0ZXInO1xyXG5leHBvcnQgeyBQb2ludCB9IGZyb20gJy4vUG9pbnQnO1xyXG5leHBvcnQgKiBmcm9tICcuL1NpbmdsZUV2ZW50TWFuYWdlcic7XHJcbmV4cG9ydCB7IFNpemUgfSBmcm9tICcuL1NpemUnO1xyXG5leHBvcnQgKiBmcm9tICcuL01vZGVscy9HZXREYXRhTW9kZWxzJztcclxuZXhwb3J0ICogZnJvbSAnLi9FeGNlcHRpb25zL1RhYmxlYXVFeGNlcHRpb25zJztcclxuZXhwb3J0ICogZnJvbSAnLi9FdmVudHMvRmlsdGVyQ2hhbmdlZEV2ZW50JztcclxuZXhwb3J0ICogZnJvbSAnLi9FdmVudHMvTWFya3NTZWxlY3RlZEV2ZW50JztcclxuZXhwb3J0ICogZnJvbSAnLi9FdmVudHMvVGFibGVhdUV2ZW50JztcclxuZXhwb3J0ICogZnJvbSAnLi9FdmVudHMvVGFibGVhdVNoZWV0RXZlbnQnO1xyXG5leHBvcnQgKiBmcm9tICcuL0V2ZW50cy9UYWJsZWF1V29ya3NoZWV0RXZlbnQnO1xyXG5leHBvcnQgKiBmcm9tICcuL0ludGVybmFsL1NpbmdsZUV2ZW50TWFuYWdlckltcGwnO1xyXG5leHBvcnQgKiBmcm9tICcuL1NlcnZpY2VzL0RhdGFTb3VyY2VTZXJ2aWNlJztcclxuZXhwb3J0ICogZnJvbSAnLi9TZXJ2aWNlcy9HZXREYXRhU2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vU2VydmljZXMvRmlsdGVyU2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vU2VydmljZXMvTm90aWZpY2F0aW9uU2VydmljZSc7XHJcbmV4cG9ydCB7IFBhcmFtZXRlcnNTZXJ2aWNlIH0gZnJvbSAnLi9TZXJ2aWNlcy9QYXJhbWV0ZXJzU2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vU2VydmljZXMvUmVnaXN0ZXJBbGxTaGFyZWRTZXJ2aWNlcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vU2VydmljZXMvU2VsZWN0aW9uU2VydmljZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vU2VydmljZXMvU2VydmljZVJlZ2lzdHJ5JztcclxuZXhwb3J0ICogZnJvbSAnLi9FbnVtTWFwcGluZ3MvSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzJztcclxuZXhwb3J0ICogZnJvbSAnLi9Dcm9zc0ZyYW1lL0Nyb3NzRnJhbWVCb290c3RyYXAnO1xyXG5leHBvcnQgKiBmcm9tICcuL1ZlcnNpb25OdW1iZXInO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0FwaVNoYXJlZC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgU2luZ2xlRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi9TaW5nbGVFdmVudE1hbmFnZXInO1xyXG5cclxuLyoqXHJcbiAqIENsYXNzIGRlc2lnbmVkIHRvIHJlZ2lzdGVyIGFuZCB1bnJlZ2lzdGVyIGhhbmRsZXJzIGZyb20gYSB1c2VyLiBPbmx5IHRob3NlIGV2ZW50c1xyXG4gKiB3aGljaCBhcmUgYWRkZWQgdmlhIEFkZE5ld0V2ZW50VHlwZSB3aWxsIGJlIHN1cHBvcnRlZCBieSB0aGlzIGluc3RhbmNlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXZlbnRMaXN0ZW5lck1hbmFnZXIgaW1wbGVtZW50cyAgQ29udHJhY3QuRXZlbnRMaXN0ZW5lck1hbmFnZXIge1xyXG4gIHByaXZhdGUgc3RhdGljIFVOU1VQUE9SVEVEX0VWRU5UOiBzdHJpbmcgPSAnVW5zdXBwb3J0ZWQgZXZlbnQgdHlwZSA6ICUxJztcclxuICBwcml2YXRlIF9ldmVudExpc3RlbmVyTWFuYWdlcnM6IHsgW3RhYmxlYXVFdmVudFR5cGU6IHN0cmluZ106IFNpbmdsZUV2ZW50TWFuYWdlcjsgfTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fZXZlbnRMaXN0ZW5lck1hbmFnZXJzID0ge307XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGU6IENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogQ29udHJhY3QuVGFibGVhdUV2ZW50SGFuZGxlckZuKTogQ29udHJhY3QuVGFibGVhdUV2ZW50VW5yZWdpc3RlckZuIHtcclxuICAgIGlmICghdGhpcy5fZXZlbnRMaXN0ZW5lck1hbmFnZXJzLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5lcnJvcihFdmVudExpc3RlbmVyTWFuYWdlci5VTlNVUFBPUlRFRF9FVkVOVCwgW2V2ZW50VHlwZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9ldmVudExpc3RlbmVyTWFuYWdlcnNbZXZlbnRUeXBlXS5hZGRFdmVudExpc3RlbmVyKGhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlOiBDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlLCBoYW5kbGVyOiBDb250cmFjdC5UYWJsZWF1RXZlbnRIYW5kbGVyRm4pOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5fZXZlbnRMaXN0ZW5lck1hbmFnZXJzLmhhc093blByb3BlcnR5KGV2ZW50VHlwZSkpIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5lcnJvcihFdmVudExpc3RlbmVyTWFuYWdlci5VTlNVUFBPUlRFRF9FVkVOVCwgW2V2ZW50VHlwZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLl9ldmVudExpc3RlbmVyTWFuYWdlcnNbZXZlbnRUeXBlXS5yZW1vdmVFdmVudExpc3RlbmVyKGhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGFkZE5ld0V2ZW50VHlwZShldmVudE1hbmFnZXI6IFNpbmdsZUV2ZW50TWFuYWdlcik6IHZvaWQge1xyXG4gICAgdGhpcy5fZXZlbnRMaXN0ZW5lck1hbmFnZXJzW2V2ZW50TWFuYWdlci5ldmVudFR5cGVdID0gZXZlbnRNYW5hZ2VyO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0V2ZW50TGlzdGVuZXJNYW5hZ2VyLnRzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgeW91ciBtYWluLiBUaGlzIGlzIHdoZXJlIHlvdSByZS1leHBvcnQgZXZlcnl0aGluZyB5b3Ugd2FudCB0byBiZSBwdWJsaWNseSBhdmFpbGFibGUuXHJcbiAqXHJcbiAqIFRoZSBidWlsZCBlbmZvcmNlcyB0aGF0IHRoZSBmaWxlIGhhcyB0aGUgc2FtZSBuYW1lIGFzIHRoZSBnbG9iYWwgdmFyaWFibGUgdGhhdCBpcyBleHBvcnRlZC5cclxuICovXHJcblxyXG5leHBvcnQgeyBFbnVtQ29udmVydGVyIH0gZnJvbSAnLi9FbnVtQ29udmVydGVyJztcclxuZXhwb3J0IHsgUGFyYW0gfSBmcm9tICcuL1BhcmFtJztcclxuZXhwb3J0IHsgVGFibGVhdUV4Y2VwdGlvbiB9IGZyb20gJy4vVGFibGVhdUV4Y2VwdGlvbic7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXV0aWxzL3NyYy9BcGlVdGlscy50c1xuICoqLyIsImltcG9ydCB7IFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICcuL1RhYmxlYXVFeGNlcHRpb24nO1xyXG4vKipcclxuICogVGhpcyBjbGFzcyBjb252ZXJ0cyBmcm9tIGEgc291cmNlIGVudW0gdmFsdWUgdG8gZGVzdGluYXRpb24gZW51bVxyXG4gKiB2YWx1ZSBnaXZlbiBhIG1hcHBpbmcgZnJvbSBzb3VyY2UgdG8gZGVzdGluYXRpb24gd2hlbiBjb25zdHJ1Y3RlZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBFbnVtQ29udmVydGVyPFRTb3VyY2VUeXBlIGV4dGVuZHMgc3RyaW5nLCBURGVzdGluYXRpb25UeXBlPiB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgTUFQUElOR19OT1RfRk9VTkQ6IHN0cmluZyA9ICdNYXBwaW5nIG5vdCBmb3VuZCBmb3IgJTEnO1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX21hcHBpbmdzOiB7IFtlbnVtVmFsOiBzdHJpbmddOiBURGVzdGluYXRpb25UeXBlOyB9LFxyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdFZhbD86IFREZXN0aW5hdGlvblR5cGUpIHsgfVxyXG5cclxuICBwdWJsaWMgY29udmVydChlbnVtVmFsOiBUU291cmNlVHlwZSwgdGhyb3dJZk1pc3Npbmc/OiBib29sZWFuKTogVERlc3RpbmF0aW9uVHlwZSB7XHJcbiAgICBpZiAodGhpcy5fbWFwcGluZ3MuaGFzT3duUHJvcGVydHkoZW51bVZhbCkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX21hcHBpbmdzW2VudW1WYWwgYXMgc3RyaW5nXTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fZGVmYXVsdFZhbCAhPT0gdW5kZWZpbmVkICYmICF0aHJvd0lmTWlzc2luZykge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdFZhbDtcclxuICAgIH1cclxuXHJcbiAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmVycm9yKEVudW1Db252ZXJ0ZXIuTUFQUElOR19OT1RfRk9VTkQsIFtlbnVtVmFsXSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXV0aWxzL3NyYy9FbnVtQ29udmVydGVyLnRzXG4gKiovIiwiZXhwb3J0IGNsYXNzIFRhYmxlYXVFeGNlcHRpb24ge1xyXG4gIHB1YmxpYyBzdGF0aWMgQVBJX05PVF9JTVBMRU1FTlRFRDogc3RyaW5nID0gJyUxIEFQSSBub3QgeWV0IGltcGxlbWVudGVkLic7XHJcbiAgcHVibGljIHN0YXRpYyBVTkRFRklORUQ6IHN0cmluZyA9ICclMSBpcyB1bmRlZmluZWQuJztcclxuICBwdWJsaWMgc3RhdGljIElOVkFMSURfUEFSQU1FVEVSX1ZBTFVFOiBzdHJpbmcgPSAnSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyOiAlMS4gJTInO1xyXG4gIHB1YmxpYyBzdGF0aWMgSU5WQUxJRF9QQVJBTUVURVJfVFlQRTogc3RyaW5nID0gJ0ludmFsaWQgdHlwZSBmb3IgcGFyYW1ldGVyOiAlMS4gJTInO1xyXG4gIHB1YmxpYyBzdGF0aWMgTUlTU0lOR19QQVJBTUVURVI6IHN0cmluZyA9ICdNaXNzaW5nIFBhcmFtZXRlcjogJTEuJztcclxuICBwdWJsaWMgc3RhdGljIFVOS05PV05fRVJST1I6IHN0cmluZyA9ICdVbmtub3duIGVycm9yLic7XHJcbiAgcHVibGljIHN0YXRpYyBJTlRFUk5BTF9FUlJPUjogc3RyaW5nID0gJ0ludGVybmFsIGVycm9yOiAlMS4nO1xyXG4gIHB1YmxpYyBzdGF0aWMgSU5WQUxJRDogc3RyaW5nID0gJ0ludmFsaWQ6ICUxLiAlMic7XHJcbiAgcHVibGljIHN0YXRpYyBJU19OVUxMOiBzdHJpbmcgPSAnJTEgaXMgbnVsbC4nO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGFwaU5vdEltcGxlbWVudGVkIChwYXJhbXM6IEFycmF5PHN0cmluZz4pOiBFcnJvciB7XHJcbiAgICBsZXQgbWVzc2FnZTogc3RyaW5nID0gVGFibGVhdUV4Y2VwdGlvbi5mb3JtYXQoVGFibGVhdUV4Y2VwdGlvbi5BUElfTk9UX0lNUExFTUVOVEVELCBwYXJhbXMpO1xyXG4gICAgcmV0dXJuIG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgaXNVbmRlZmluZWQgKHBhcmFtczogQXJyYXk8c3RyaW5nPik6IEVycm9yIHtcclxuICAgIGxldCBtZXNzYWdlOiBzdHJpbmcgPSBUYWJsZWF1RXhjZXB0aW9uLmZvcm1hdChUYWJsZWF1RXhjZXB0aW9uLlVOREVGSU5FRCwgcGFyYW1zKTtcclxuICAgIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGlzTnVsbCAocGFyYW1zOiBBcnJheTxzdHJpbmc+KTogRXJyb3Ige1xyXG4gICAgbGV0IG1lc3NhZ2U6IHN0cmluZyA9IFRhYmxlYXVFeGNlcHRpb24uZm9ybWF0KFRhYmxlYXVFeGNlcHRpb24uSVNfTlVMTCwgcGFyYW1zKTtcclxuICAgIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGludmFsaWRQYXJhbVZhbHVlIChwYXJhbXM6IEFycmF5PHN0cmluZz4pOiBFcnJvciB7XHJcbiAgICBsZXQgbWVzc2FnZTogc3RyaW5nID0gVGFibGVhdUV4Y2VwdGlvbi5mb3JtYXQoVGFibGVhdUV4Y2VwdGlvbi5JTlZBTElEX1BBUkFNRVRFUl9WQUxVRSwgcGFyYW1zKTtcclxuICAgIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGludmFsaWRQYXJhbVR5cGUgKHBhcmFtczogQXJyYXk8c3RyaW5nPik6IEVycm9yIHtcclxuICAgIGxldCBtZXNzYWdlOiBzdHJpbmcgPSBUYWJsZWF1RXhjZXB0aW9uLmZvcm1hdChUYWJsZWF1RXhjZXB0aW9uLklOVkFMSURfUEFSQU1FVEVSX1RZUEUsIHBhcmFtcyk7XHJcbiAgICByZXR1cm4gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBtaXNzaW5nUGFyYW1ldGVyIChwYXJhbXM6IEFycmF5PHN0cmluZz4pOiBFcnJvciB7XHJcbiAgICBsZXQgbWVzc2FnZTogc3RyaW5nID0gVGFibGVhdUV4Y2VwdGlvbi5mb3JtYXQoVGFibGVhdUV4Y2VwdGlvbi5NSVNTSU5HX1BBUkFNRVRFUiwgcGFyYW1zKTtcclxuICAgIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGludmFsaWQgKHBhcmFtczogQXJyYXk8c3RyaW5nPik6IEVycm9yIHtcclxuICAgIGxldCBtZXNzYWdlOiBzdHJpbmcgPSBUYWJsZWF1RXhjZXB0aW9uLmZvcm1hdChUYWJsZWF1RXhjZXB0aW9uLklOVkFMSUQsIHBhcmFtcyk7XHJcbiAgICByZXR1cm4gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBpbnRlcm5hbEVycm9yIChwYXJhbXM6IEFycmF5PHN0cmluZz4pOiBFcnJvciB7XHJcbiAgICBsZXQgbWVzc2FnZTogc3RyaW5nID0gVGFibGVhdUV4Y2VwdGlvbi5mb3JtYXQoVGFibGVhdUV4Y2VwdGlvbi5JTlRFUk5BTF9FUlJPUiwgcGFyYW1zKTtcclxuICAgIHJldHVybiBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGVycm9yIChtZXNzYWdlOiBzdHJpbmcsIHBhcmFtcz86IEFycmF5PHN0cmluZz4pOiBFcnJvciB7XHJcbiAgICBsZXQgcmVzdWx0OiBzdHJpbmc7XHJcbiAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgIHJlc3VsdCA9IFRhYmxlYXVFeGNlcHRpb24uZm9ybWF0KG1lc3NhZ2UsIHBhcmFtcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHQgPSBtZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBFcnJvcihyZXN1bHQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBmb3JtYXQgKG1lc3NhZ2U6IHN0cmluZywgcGFyYW1zOiBBcnJheTxzdHJpbmc+KTogc3RyaW5nIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBtYXRjaDogc3RyaW5nID0gJyUnICsgKGkgKyAxKTtcclxuICAgICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZShuZXcgUmVnRXhwKG1hdGNoLCAnZycpLCBwYXJhbXNbaV0pO1xyXG4gICAgfVxyXG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UucmVwbGFjZShuZXcgUmVnRXhwKCclWzAtOV0rJywgJ2cnKSwgJycpO1xyXG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UudHJpbSgpO1xyXG4gICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXV0aWxzL3NyYy9UYWJsZWF1RXhjZXB0aW9uLnRzXG4gKiovIiwiaW1wb3J0IHsgVGFibGVhdUV4Y2VwdGlvbiB9IGZyb20gJy4vVGFibGVhdUV4Y2VwdGlvbic7XHJcbmV4cG9ydCBjbGFzcyBQYXJhbSB7XHJcbiAgLyoqXHJcbiAgICogVmVyaWZpZXMgdGhhdCBhbiBpbmNvbWluZyBwYXJhbWV0ZXIgaXMgJ3RydXRoeScgYW5kIHRocm93c1xyXG4gICAqIGFuIGVycm9yIGlmIGl0J3Mgbm90LiBUaGlzIHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIHZhbHVlXHJcbiAgICogaXMgbnVsbCwgdW5kZWZpbmVkLCBOYU4sIHRoZSBlbXB0eSBzdHJpbmcsIDAsIG9yIGZhbHNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGFyZ3VtZW50VmFsdWUgdmFsdWUgdG8gdmVyaWZ5XHJcbiAgICogQHBhcmFtIGFyZ3VtZW50TmFtZSBuYW1lIG9mIGFyZ3VtZW50IHRvIHZlcmlmeVxyXG4gICAqL1xyXG4gIC8qdHNsaW50OmRpc2FibGUtbmV4dC1saW5lICovXHJcbiAgcHVibGljIHN0YXRpYyB2ZXJpZnlWYWx1ZShhcmd1bWVudFZhbHVlOiBhbnksIGFyZ3VtZW50TmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoIWFyZ3VtZW50VmFsdWUpIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5pbnZhbGlkUGFyYW1WYWx1ZShbYXJndW1lbnROYW1lXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWZXJpZmllcyB0aGF0IGEgc3RyaW5nIGlzIHZhbGlkLiAgVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBzdHJpbmcgaXNcclxuICAgKiBudWxsLCB1bmRlZmluZWQsIG9yIE5hTi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBhcmd1bWVudFZhbHVlIHZhbHVlIHRvIHZlcmlmeVxyXG4gICAqIEBwYXJhbSBhcmd1bWVudE5hbWUgbmFtZSBvZiBhcmd1bWVudCB0byB2ZXJpZnlcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHZlcmlmeVN0cmluZyhhcmd1bWVudFZhbHVlOiBzdHJpbmcsIGFyZ3VtZW50TmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBpZiAoYXJndW1lbnRWYWx1ZSA9PT0gbnVsbCB8fCBhcmd1bWVudFZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5pbnZhbGlkUGFyYW1WYWx1ZShbYXJndW1lbnROYW1lXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWZXJpZmllcyB0aGUgdmFsdWUgaXMgcGFydCBvZiB0aGUgRW51bVxyXG4gICAqXHJcbiAgICogU3RyaW5nIGVudW1zIGFyZSB7c3RyaW5nIDogc3RyaW5nfSBkaWN0aW9uYXJpZXMgd2hpY2ggYXJlIG5vdCByZXZlcnNlIG1hcHBhYmxlXHJcbiAgICogVGhpcyBpcyBhbiB1Z2x5IHdvcmthcm91bmRcclxuICAgKiBAcGFyYW0gdmFsdWUgdmFsdWUgdG8gdmVyaWZ5XHJcbiAgICogQHBhcmFtIGVudW1UeXBlIGVudW0gdG8gdmVyaWZ5IGFnYWluc3RcclxuICAgKi9cclxuICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgKi9cclxuICBwdWJsaWMgc3RhdGljIGlzVmFsaWRFbnVtVmFsdWU8RW51bVR5cGU+KHZhbHVlOiBFbnVtVHlwZSwgZW51bVR5cGU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IGlzVmFsaWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIE9iamVjdC5rZXlzKGVudW1UeXBlKS5mb3JFYWNoKChlbnVtS2V5KSA9PiB7XHJcbiAgICAgIGlmIChlbnVtVHlwZVtlbnVtS2V5XSA9PT0gdmFsdWUudG9TdHJpbmcoKSkge1xyXG4gICAgICAgIGlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gIH1cclxuICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLWFueSAqL1xyXG5cclxuICAvKipcclxuICAgKiBzZXJpYWxpemVzIHRoZSBkYXRlIGludG8gdGhlIGZvcm1hdCB0aGF0IHRoZSBzZXJ2ZXIgZXhwZWN0cy5cclxuICAgKiBAcGFyYW0gZGF0ZSB0aGUgZGF0ZSB0byBzZXJpYWxpemVcclxuICAgKi9cclxuICBwdWJsaWMgc3RhdGljIHNlcmlhbGl6ZURhdGVGb3JQbGF0Zm9ybShkYXRlOiBEYXRlKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHllYXI6IG51bWJlciA9IGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcclxuICAgIGNvbnN0IG1vbnRoOiBudW1iZXIgPSBkYXRlLmdldFVUQ01vbnRoKCkgKyAxO1xyXG4gICAgY29uc3QgZGF5OiBudW1iZXIgPSBkYXRlLmdldFVUQ0RhdGUoKTtcclxuICAgIGNvbnN0IGhoOiBudW1iZXIgPSBkYXRlLmdldFVUQ0hvdXJzKCk7XHJcbiAgICBjb25zdCBtbTogbnVtYmVyID0gZGF0ZS5nZXRVVENNaW51dGVzKCk7XHJcbiAgICBjb25zdCBzZWM6IG51bWJlciA9IGRhdGUuZ2V0VVRDU2Vjb25kcygpO1xyXG4gICAgcmV0dXJuIHllYXIgKyAnLScgKyBtb250aCArICctJyArIGRheSArICcgJyArIGhoICsgJzonICsgbW0gKyAnOicgKyBzZWM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHNlcmlhbGl6ZUJvb2xlYW5Gb3JQbGF0Zm9ybShib29sOiBib29sZWFuKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBib29sID8gJ3RydWUnIDogJ2ZhbHNlJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgc2VyaWFsaXplTnVtYmVyRm9yUGxhdGZvcm0obnVtOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIG51bS50b1N0cmluZygxMCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWZXJpZmllcyB0aGUgcGFyYW1zIG1pbiBhbmQgbWF4IGZvciBhcHBseWluZyByYW5nZSBmaWx0ZXJcclxuICAgKiBAcGFyYW0gbWluIHJhbmdlIG1pblxyXG4gICAqIEBwYXJhbSBtYXggcmFuZ2UgbWF4XHJcbiAgICovXHJcbiAgLyogdHNsaW50OmRpc2FibGU6bm8tYW55ICovXHJcbiAgcHVibGljIHN0YXRpYyB2ZXJpZnlSYW5nZVBhcmFtVHlwZShtaW46IGFueSwgbWF4OiBhbnkpOiB2b2lkIHtcclxuICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLWFueSAqL1xyXG4gICAgaWYgKCFtaW4gJiYgIW1heCkge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmludmFsaWRQYXJhbVZhbHVlKFsnUmFuZ2UgcGFyYW1ldGVycycsICdBdCBsZWFzdCBvbmUgb2YgbWluIG9yIG1heCBpcyByZXF1aXJlZC4nXSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFQYXJhbS5pc1R5cGVOdW1iZXIobWluKSAmJiAhUGFyYW0uaXNUeXBlRGF0ZShtaW4pKSB7XHJcbiAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uaW52YWxpZFBhcmFtVHlwZShbJ1JhbmdlIHBhcmFtZXRlcnMnLCAnT25seSBEYXRlIGFuZCBudW1iZXIgYXJlIGFsbG93ZWQgZm9yIHBhcmFtZXRlciBtaW4uJ10pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghUGFyYW0uaXNUeXBlTnVtYmVyKG1heCkgJiYgIVBhcmFtLmlzVHlwZURhdGUobWF4KSkge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmludmFsaWRQYXJhbVR5cGUoWydSYW5nZSBwYXJhbWV0ZXJzJywgJ09ubHkgRGF0ZSBhbmQgbnVtYmVyIGFyZSBhbGxvd2VkIGZvciBwYXJhbWV0ZXIgbWF4LiddKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mKG1pbikgIT09IHR5cGVvZihtYXgpKSB7XHJcbiAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uaW52YWxpZFBhcmFtVHlwZShbJ1JhbmdlIHBhcmFtZXRlcnMnLCAnUGFyYW1ldGVycyBtaW4gYW5kIG1heCBzaG91bGQgYmUgb2YgdGhlIHNhbWUgdHlwZS4nXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBWZXJpZmllcyB0aGUgaW5wdXQgaXMgYSBudW1iZXJcclxuICAgKi9cclxuICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgKi9cclxuICBwdWJsaWMgc3RhdGljIGlzVHlwZU51bWJlcihpbnB1dDogYW55KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHlwZW9mKGlucHV0KSA9PT0gJ251bWJlcicgfHwgaW5wdXQgaW5zdGFuY2VvZiBOdW1iZXI7XHJcbiAgfVxyXG4gIC8qIHRzbGludDplbmFibGU6bm8tYW55ICovXHJcblxyXG4gIC8qKlxyXG4gICAqIFZlcmlmaWVzIHRoZSBpbnB1dCBpcyBhIERhdGVcclxuICAgKi9cclxuICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgKi9cclxuICBwdWJsaWMgc3RhdGljIGlzVHlwZURhdGUoaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGlucHV0IGluc3RhbmNlb2YgRGF0ZTtcclxuICB9XHJcbiAgLyogdHNsaW50OmVuYWJsZTpuby1hbnkgKi9cclxuXHJcbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgaXNUeXBlU3RyaW5nKGlucHV0OiBhbnkpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0eXBlb2YoaW5wdXQpID09PSAnc3RyaW5nJyB8fCBpbnB1dCBpbnN0YW5jZW9mIFN0cmluZztcclxuICB9XHJcblxyXG4gIC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgKi9cclxuICBwdWJsaWMgc3RhdGljIGlzVHlwZUJvb2woaW5wdXQ6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHR5cGVvZihpbnB1dCkgPT09ICdib29sZWFuJyB8fCBpbnB1dCBpbnN0YW5jZW9mIEJvb2xlYW47XHJcbiAgfVxyXG5cclxuICAvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55ICovXHJcbiAgcHVibGljIHN0YXRpYyBzZXJpYWxpemVQYXJhbXRlclZhbHVlKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgaWYgKFBhcmFtLmlzVHlwZU51bWJlcih2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIFBhcmFtLnNlcmlhbGl6ZU51bWJlckZvclBsYXRmb3JtKHZhbHVlIGFzIG51bWJlcik7XHJcbiAgICB9IGVsc2UgaWYgKFBhcmFtLmlzVHlwZURhdGUodmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiBQYXJhbS5zZXJpYWxpemVEYXRlRm9yUGxhdGZvcm0odmFsdWUgYXMgRGF0ZSk7XHJcbiAgICB9IGVsc2UgaWYgKFBhcmFtLmlzVHlwZUJvb2wodmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiBQYXJhbS5zZXJpYWxpemVCb29sZWFuRm9yUGxhdGZvcm0odmFsdWUgYXMgYm9vbGVhbik7XHJcbiAgICB9IGVsc2UgaWYgKFBhcmFtLmlzVHlwZVN0cmluZyh2YWx1ZSkpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5pbnZhbGlkUGFyYW1WYWx1ZShbJ3ZhbHVlJ10pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvanMtYXBpL2FwaS11dGlscy9zcmMvUGFyYW0udHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHsgRXZlbnRMaXN0ZW5lck1hbmFnZXIgfSBmcm9tICcuL0V2ZW50TGlzdGVuZXJNYW5hZ2VyJztcclxuaW1wb3J0IHsgUGFyYW1ldGVySW1wbCB9IGZyb20gJy4vSW50ZXJuYWwvUGFyYW1ldGVySW1wbCc7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIFBhcmFtZXRlciBjb250cmFjdC4gQ2FsbHMgZG93biB0byB0aGUgaW1wbFxyXG4gKiBjbGFzcyBmb3IgYWxtb3N0IGFsbCBvZiB0aGUgd29yayBpdCBkb2VzLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFBhcmFtZXRlciBleHRlbmRzIEV2ZW50TGlzdGVuZXJNYW5hZ2VyIGltcGxlbWVudHMgQ29udHJhY3QuUGFyYW1ldGVyIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBwYXJhbWV0ZXJJbXBsOiBQYXJhbWV0ZXJJbXBsLCBzaGVldDogQ29udHJhY3QuU2hlZXQpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6ZSBvdXIgZXZlbnQgaGFuZGxpbmcgZm9yIHRoaXMgY2xhc3NcclxuICAgIHRoaXMucGFyYW1ldGVySW1wbC5pbml0aWFsaXplRXZlbnRzKHNoZWV0KS5mb3JFYWNoKGUgPT4gdGhpcy5hZGROZXdFdmVudFR5cGUoZSkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXJhbWV0ZXJJbXBsLm5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGN1cnJlbnRWYWx1ZSgpOiBDb250cmFjdC5EYXRhVmFsdWUge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyYW1ldGVySW1wbC5jdXJyZW50VmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGRhdGFUeXBlKCk6IENvbnRyYWN0LkRhdGFUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLnBhcmFtZXRlckltcGwuZGF0YVR5cGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGFsbG93YWJsZVZhbHVlcygpOiBDb250cmFjdC5QYXJhbWV0ZXJEb21haW5SZXN0cmljdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXJhbWV0ZXJJbXBsLmFsbG93YWJsZVZhbHVlcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnBhcmFtZXRlckltcGwuaWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2hhbmdlVmFsdWVBc3luYyhuZXdWYWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IERhdGUpOiBQcm9taXNlPENvbnRyYWN0LkRhdGFWYWx1ZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyYW1ldGVySW1wbC5jaGFuZ2VWYWx1ZUFzeW5jKG5ld1ZhbHVlKTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9QYXJhbWV0ZXIudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBvaW50IGltcGxlbWVudHMgQ29udHJhY3QuUG9pbnQge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF94OiBudW1iZXIsIHByaXZhdGUgX3k6IG51bWJlcikgeyB9XHJcblxyXG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3g7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHkoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl95O1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1BvaW50LnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaXplIGltcGxlbWVudHMgQ29udHJhY3QuU2l6ZSB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX2hlaWdodDogbnVtYmVyLCBwcml2YXRlIF93aWR0aDogbnVtYmVyKSB7IH1cclxuXHJcbiAgcHVibGljIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHdpZHRoKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fd2lkdGg7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvU2l6ZS50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlIGltcGxlbWVudHMgQ29udHJhY3QuRGF0YVRhYmxlIHtcclxuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2RhdGE6IEFycmF5PEFycmF5PENvbnRyYWN0LkRhdGFWYWx1ZT4+LFxyXG4gICAgcHJpdmF0ZSBfY29sdW1uczogQXJyYXk8Q29udHJhY3QuQ29sdW1uPixcclxuICAgIHByaXZhdGUgX3RvdGFsUm93Q291bnQ6IG51bWJlcixcclxuICAgIHByaXZhdGUgX2lzU3VtbWFyeURhdGE6IGJvb2xlYW4sXHJcbiAgICBwcml2YXRlIF9tYXJrc0luZm8/OiBBcnJheTxNYXJrSW5mbz4pIHtcclxuICAgICAgICAvLyBUT0RPOiBnZXQgcmlkIG9mIHRoaXMgaW4gcmVkZXNpZ24uXHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IF9pc1N1bW1hcnlEYXRhID8gJ1N1bW1hcnkgRGF0YSBUYWJsZScgOiAnVW5kZXJseWluZyBEYXRhIFRhYmxlJztcclxuICAgIH1cclxuXHJcbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBBcnJheTxBcnJheTxDb250cmFjdC5EYXRhVmFsdWU+PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgY29sdW1ucygpOiBBcnJheTxDb250cmFjdC5Db2x1bW4+IHtcclxuICAgIHJldHVybiB0aGlzLl9jb2x1bW5zO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBtYXJrc0luZm8oKTogQXJyYXk8Q29udHJhY3QuTWFya0luZm8+IHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXJrc0luZm87XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHRvdGFsUm93Q291bnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl90b3RhbFJvd0NvdW50O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc1N1bW1hcnlEYXRhKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lzU3VtbWFyeURhdGE7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWFya0luZm8gaW1wbGVtZW50cyBDb250cmFjdC5NYXJrSW5mbyB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfdHlwZTogQ29udHJhY3QuTWFya1R5cGUsXHJcbiAgICBwcml2YXRlIF9jb2xvcjogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBfdHVwbGVJZD86IE51bWJlclxyXG4gICkge31cclxuXHJcbiAgcHVibGljIGdldCB0eXBlKCk6IENvbnRyYWN0Lk1hcmtUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLl90eXBlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBjb2xvcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB0dXBsZUlkKCk6IE51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5fdHVwbGVJZDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDb2x1bW4gaW1wbGVtZW50cyBDb250cmFjdC5Db2x1bW4ge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2ZpZWxkTmFtZTogc3RyaW5nLFxyXG4gICAgcHJpdmF0ZSBfZGF0YVR5cGU6IENvbnRyYWN0LkRhdGFUeXBlLCAvLyBUT0RPOiB0aGlzIHNob3VkbCBiZSBhbiBlbnVtIHR5cGVcclxuICAgIHByaXZhdGUgX2lzUmVmZXJlbmNlZDogYm9vbGVhbixcclxuICAgIHByaXZhdGUgX2luZGV4OiBudW1iZXIpIHt9XHJcblxyXG4gIHB1YmxpYyBnZXQgZmllbGROYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGROYW1lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBkYXRhVHlwZSgpOiBDb250cmFjdC5EYXRhVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVR5cGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGlzUmVmZXJlbmNlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc1JlZmVyZW5jZWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGluZGV4KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5faW5kZXg7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YVZhbHVlIGltcGxlbWVudHMgQ29udHJhY3QuRGF0YVZhbHVlIHtcclxuICAvKiB0c2xpbnQ6ZGlzYWJsZTpuby1hbnkgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF92YWx1ZTogYW55LFxyXG4gICAgcHJpdmF0ZSBfZm9ybWF0dGVkVmFsdWU6IHN0cmluZykge31cclxuXHJcbiAgcHVibGljIGdldCB2YWx1ZSgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBmb3JtYXR0ZWRWYWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1hdHRlZFZhbHVlO1xyXG4gIH1cclxuICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLWFueSAqL1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvTW9kZWxzL0dldERhdGFNb2RlbHMudHNcbiAqKi8iLCJleHBvcnQgY2xhc3MgVGFibGVhdUV4Y2VwdGlvbnMge1xyXG4gIC8vIFRPRE8sIEFwaUVycm9yQ29kZXMgbmVlZCB0byBiZSBhZGRlZCB0byBleHRlcm5hbCBpbnRlcmZhY2VzLlxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRXhjZXB0aW9ucy9UYWJsZWF1RXhjZXB0aW9ucy50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgVGFibGVhdVdvcmtzaGVldEV2ZW50IH0gZnJvbSAnLi9UYWJsZWF1V29ya3NoZWV0RXZlbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbHRlckNoYW5nZWRFdmVudCBleHRlbmRzIFRhYmxlYXVXb3Jrc2hlZXRFdmVudCBpbXBsZW1lbnRzIENvbnRyYWN0LkZpbHRlckNoYW5nZWRFdmVudCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHdvcmtzaGVldDogQ29udHJhY3QuV29ya3NoZWV0LCBwcml2YXRlIF9maWVsZE5hbWU6IHN0cmluZykge1xyXG4gICAgc3VwZXIoQ29udHJhY3QuVGFibGVhdUV2ZW50VHlwZS5GaWx0ZXJDaGFuZ2VkLCB3b3Jrc2hlZXQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBmaWVsZE5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZE5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RmlsdGVyQXN5bmMoKTogUHJvbWlzZTxDb250cmFjdC5GaWx0ZXI+IHtcclxuICAgIHJldHVybiB0aGlzLl93b3Jrc2hlZXQuZ2V0RmlsdGVyc0FzeW5jKCkudGhlbjxDb250cmFjdC5GaWx0ZXI+KGZpbHRlcnMgPT4ge1xyXG4gICAgICAvLyBUT0RPOiBGaWx0ZXJpbmcgb2YgdGhlIGZpbHRlcnMgc2hvdWxkIGV2ZW50dWFsbHkgYmUgZG9uZSBwbGF0Zm9ybSBzaWRlLlxyXG4gICAgICBjb25zdCBldmVudGVkRmlsdGVyID0gZmlsdGVycy5maW5kKChmaWx0ZXIpID0+IChmaWx0ZXIuZmllbGROYW1lID09PSB0aGlzLl9maWVsZE5hbWUpKTtcclxuXHJcbiAgICAgIGlmICghZXZlbnRlZEZpbHRlcikge1xyXG4gICAgICAgIC8vIFdlIHNob3VsZG4ndCBoaXQgdGhpcyB1bmxlc3MgdGhlIGZpbHRlciB3YXMgcmVtb3ZlZCBmcm9tIHRoZSB3b3Jrc2hlZXRcclxuICAgICAgICAvLyBhZnRlciB0aGUgZXZlbnQgd2FzIHJhaXNlZC5cclxuICAgICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmludGVybmFsRXJyb3IoWydGaWx0ZXIgbm8gbG9uZ2VyIGZvdW5kIGluIHdvcmtzaGVldC4nXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBldmVudGVkRmlsdGVyO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRXZlbnRzL0ZpbHRlckNoYW5nZWRFdmVudC50c1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIHlvdXIgbWFpbi4gVGhpcyBpcyB3aGVyZSB5b3UgcmUtZXhwb3J0IGV2ZXJ5dGhpbmcgeW91IHdhbnQgdG8gYmUgcHVibGljbHkgYXZhaWxhYmxlLlxyXG4gKlxyXG4gKiBUaGUgYnVpbGQgZW5mb3JjZXMgdGhhdCB0aGUgZmlsZSBoYXMgdGhlIHNhbWUgbmFtZSBhcyB0aGUgZ2xvYmFsIHZhcmlhYmxlIHRoYXQgaXMgZXhwb3J0ZWQuXHJcbiAqL1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9BbmFseXRpY3NJbnRlcmZhY2VzJztcclxuZXhwb3J0ICogZnJvbSAnLi9EYXRhU291cmNlSW50ZXJmYWNlcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vRGF0YVRhYmxlSW50ZXJmYWNlcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vRW5jb2RpbmdJbnRlcmZhY2VzJztcclxuZXhwb3J0ICogZnJvbSAnLi9FbnVtcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vRXZlbnRJbnRlcmZhY2VzJztcclxuZXhwb3J0ICogZnJvbSAnLi9GaWx0ZXJJbnRlcmZhY2VzJztcclxuZXhwb3J0ICogZnJvbSAnLi9TZWxlY3Rpb25JbnRlcmZhY2VzJztcclxuZXhwb3J0ICogZnJvbSAnLi9QYXJhbWV0ZXJJbnRlcmZhY2VzJztcclxuZXhwb3J0ICogZnJvbSAnLi9TZWxlY3Rpb25JbnRlcmZhY2VzJztcclxuZXhwb3J0ICogZnJvbSAnLi9TaGVldEludGVyZmFjZXMnO1xyXG5cclxuZXhwb3J0IHsgRXh0ZW5zaW9ucyB9IGZyb20gJy4vTmFtZXNwYWNlcy9FeHRlbnNpb25zJztcclxuZXhwb3J0IHsgRGFzaGJvYXJkQ29udGVudCB9IGZyb20gJy4vTmFtZXNwYWNlcy9EYXNoYm9hcmRDb250ZW50JztcclxuZXhwb3J0IHsgRW52aXJvbm1lbnQgfSBmcm9tICcuL05hbWVzcGFjZXMvRW52aXJvbm1lbnQnO1xyXG5leHBvcnQgeyBTZXR0aW5ncyB9IGZyb20gJy4vTmFtZXNwYWNlcy9TZXR0aW5ncyc7XHJcbmV4cG9ydCB7IFVJIH0gZnJvbSAnLi9OYW1lc3BhY2VzL1VJJztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L2pzLWFwaS9hcGktZXh0ZXJuYWwtY29udHJhY3Qvc3JjL0FwaUV4dGVybmFsQ29udHJhY3QudHNcbiAqKi8iLCIvLyBBbGwgZW51bSB2YWx1ZXMgbWFkZSBhdmFpbGFibGUgdG8gRXh0ZW5zaW9ucyBkZXZlbG9wZXJzLlxyXG4vLyBFbnVtcyBzaG91bGQgYmUga2VwdCBpbiBhbHBoYWJldGljYWwgb3JkZXIuXHJcblxyXG4vKipcclxuICogVGhlIGNvbnRleHQgaW4gd2hpY2ggdGhlIEV4dGVuc2lvbnMgaXMgY3VycmVudGx5IHJ1bm5pbmcuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBFeHRlbnNpb25Db250ZXh0IHtcclxuICBEZXNrdG9wID0gJ2Rlc2t0b3AnLFxyXG4gIFNlcnZlciA9ICdzZXJ2ZXInXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgbW9kZSBpbiB3aGljaCB0aGUgRXh0ZW5zaW9ucyBpcyBjdXJyZW50bHkgcnVubmluZy5cclxuICovXHJcbmV4cG9ydCBlbnVtIEV4dGVuc2lvbk1vZGUge1xyXG4gIEF1dGhvcmluZyA9ICdhdXRob3JpbmcnLFxyXG4gIFZpZXdpbmcgPSAndmlld2luZydcclxufVxyXG5cclxuZXhwb3J0IGVudW0gQW5hbHl0aWNzT2JqZWN0VHlwZSB7XHJcbiAgQ2x1c3RlciA9ICdjbHVzdGVyJyxcclxuICBGb3JlY2FzdCA9ICdmb3JlY2FzdCcsXHJcbiAgVHJlbmRMaW5lID0gJ3RyZW5kLWxpbmUnXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIENvbHVtblR5cGUge1xyXG4gIERpc2NyZXRlID0gJ2Rpc2NyZXRlJyxcclxuICBDb250aW51b3VzID0gJ2NvbnRpbnVvdXMnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXaGF0IHRoZSBvYmplY3QgcmVwcmVzZW50cyBpbiBhIGRhc2hib2FyZC5cclxuICovXHJcbmV4cG9ydCBlbnVtIERhc2hib2FyZE9iamVjdFR5cGUge1xyXG4gIEJsYW5rID0gJ2JsYW5rJyxcclxuICBXb3Jrc2hlZXQgPSAnd29ya3NoZWV0JyxcclxuICBRdWlja0ZpbHRlciA9ICdxdWljay1maWx0ZXInLFxyXG4gIFBhcmFtZXRlckNvbnRyb2wgPSAncGFyYW1ldGVyLWNvbnRyb2wnLFxyXG4gIFBhZ2VGaWx0ZXIgPSAncGFnZS1maWx0ZXInLFxyXG4gIExlZ2VuZCA9ICdsZWdlbmQnLFxyXG4gIFRpdGxlID0gJ3RpdGxlJyxcclxuICBUZXh0ID0gJ3RleHQnLFxyXG4gIEltYWdlID0gJ2ltYWdlJyxcclxuICBXZWJQYWdlID0gJ3dlYi1wYWdlJyxcclxuICBFeHRlbnNpb24gPSAnZXh0ZW5zaW9uJ1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIGRpZmZlcmVudCB0eXBlcyBvZiBkYXRhIGEgdmFsdWUgY2FuIGhhdmVcclxuICovXHJcbmV4cG9ydCBlbnVtIERhdGFUeXBlIHtcclxuICBTdHJpbmcgPSAnc3RyaW5nJyxcclxuICBJbnQgPSAnaW50JyxcclxuICBGbG9hdCA9ICdmbG9hdCcsXHJcbiAgQm9vbCA9ICdib29sJyxcclxuICBEYXRlID0gJ2RhdGUnLFxyXG4gIERhdGVUaW1lID0gJ2RhdGUtdGltZScsXHJcbiAgU3BhdGlhbCA9ICdzcGF0aWFsJ1xyXG59XHJcblxyXG4vKipcclxuICogVmFsaWQgZGF0ZSByYW5nZXMgZm9yIGEgcmVsYXRpdmUgZGF0ZSBmaWx0ZXIuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBEYXRlUmFuZ2VUeXBlIHtcclxuICBMYXN0ID0gJ2xhc3QnLFxyXG4gIExhc3ROID0gJ2xhc3QtbicsXHJcbiAgTmV4dCA9ICduZXh0JyxcclxuICBOZXh0TiA9ICduZXh0LW4nLFxyXG4gIEN1cnJlbnQgPSAnY3VycmVudCcsXHJcbiAgVG9EYXRlID0gJ3RvLWRhdGUnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUeXBlcyBvZiBkaWFsb2cgZXZlbnQgZm9yIGV2ZW50IGxpc3RlbmluZyBiZXR3ZWVuIGEgcGFyZW50IEV4dGVuc2lvbnMgYW5kIGEgcG9wdXAgZGlhbG9nLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gRGlhbG9nRXZlbnRUeXBlIHtcclxuICBEaWFsb2dNZXNzYWdlID0gJ2RpYWxvZy1tZXNzYWdlJyxcclxuICBEaWFsb2dFdmVudCA9ICdkaWFsb2ctZXZlbnQnXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVuY29kaW5nVHlwZSB7XHJcbiAgQ29sdW1uID0gJ2NvbHVtbicsXHJcbiAgUm93ID0gJ3JvdycsXHJcbiAgUGFnZSA9ICdwYWdlJyxcclxuICBGaWx0ZXIgPSAnZmlsdGVyJyxcclxuICBNYXJrc1R5cGUgPSAnbWFya3MtdHlwZScsXHJcbiAgTWVhc3VyZVZhbHVlcyA9ICdtZWFzdXJlLXZhbHVlcycsXHJcbiAgQ29sb3IgPSAnY29sb3InLFxyXG4gIFNpemUgPSAnc2l6ZScsXHJcbiAgTGFiZWwgPSAnbGFiZWwnLFxyXG4gIERldGFpbCA9ICdkZXRhaWwnLFxyXG4gIFRvb2x0aXAgPSAndG9vbHRpcCcsXHJcbiAgU2hhcGUgPSAnc2hhcGUnLFxyXG4gIFBhdGggPSAncGF0aCcsXHJcbiAgQW5nbGUgPSAnYW5nbGUnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBbGwgZXJyb3IgY29kZXMgdXNlZCBieSB0aGUgRXh0ZW5zaW9ucyBBUEkuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBFcnJvckNvZGVzIHtcclxuICAvKipcclxuICAgKiBPbmx5IG9uZSBkaWFsb2cgY2FuIGJlIG9wZW5lZCBhdCB0aW1lIHdpdGggdGhlIFVJIG5hbWVzcGFjZSBmdW5jdGlvbmFsaXR5LlxyXG4gICAqL1xyXG4gIERpYWxvZ0FscmVhZHlPcGVuID0gJ2RpYWxvZy1hbHJlYWR5LW9wZW4nLFxyXG4gIC8qKlxyXG4gICAqIFRoZSBvcGVuIGRpYWxvZyB3YXMgY2xvc2VkIGJ5IHRoZSB1c2VyLlxyXG4gICAqL1xyXG4gIERpYWxvZ0Nsb3NlZEJ5VXNlciA9ICdkaWFsb2ctY2xvc2VkLWJ5LXVzZXInLFxyXG4gIC8qKlxyXG4gICAqIEFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGF0dGVtcHRpbmcgdG8gcGVyZm9ybSBhIGZpbHRlciBvcGVyYXRpb24uXHJcbiAgICovXHJcbiAgRmlsdGVyQ2Fubm90QmVQZXJmb3JtZWQgPSAnZmlsdGVyLWNhbm5vdC1iZS1wZXJmb3JtZWQnLFxyXG4gIC8qKlxyXG4gICAqIEFuIGVycm9yIG9jY3VycmVkIHdpdGhpbiB0aGUgVGFibGVhdSBFeHRlbnNpb25zIEFQSS4gQ29udGFjdCBUYWJsZWF1IFN1cHBvcnQuXHJcbiAgICovXHJcbiAgSW50ZXJuYWxFcnJvciA9ICdpbnRlcm5hbC1lcnJvcicsXHJcbiAgLyoqXHJcbiAgICogQW4gaW52YWxpZCBhZ2dyZWdhdGlvbiB3YXMgc3BlY2lmaWVkIGZvciB0aGUgZmlsdGVyLCBzdWNoIGFzIHNldHRpbmcgYSByYW5nZSBmaWx0ZXIgdG8gXCJTVU0oU2FsZXMpXCIgaW5zdGVhZCBvZiBcIlNhbGVzXCIuXHJcbiAgICovXHJcbiAgSW52YWxpZEFnZ3JlZ2F0aW9uRmllbGROYW1lID0gJ2ludmFsaWQtYWdncmVnYXRpb24tZmllbGQtbmFtZScsXHJcbiAgLyoqXHJcbiAgICogQSBkaWFsb2cgbXVzdCBmaXJzdCBsYXVuY2ggdG8sIGFuZCBzZW5kIG1lc3NhZ2VzIGZyb20sIHRoZSBzYW1lIGRvbWFpbiBhcyB0aGUgcGFyZW50IEV4dGVuc2lvbnMuXHJcbiAgICovXHJcbiAgSW52YWxpZERvbWFpbkRpYWxvZyA9ICdpbnZhbGlkLWRpYWxvZy1kb21haW4nLFxyXG4gIC8qKlxyXG4gICAqIEFuIGludmFsaWQgZGF0ZSB3YXMgc3BlY2lmaWVkIGluIGEgbWV0aG9kIHRoYXQgcmVxdWlyZWQgYSBkYXRlIHBhcmFtZXRlci5cclxuICAgKi9cclxuICBJbnZhbGlkRGF0ZVBhcmFtZXRlciA9ICdpbnZhbGlkLWRhdGUtcGFyYW1ldGVyJyxcclxuICAvKipcclxuICAgKiBBIGZpbHRlciBvcGVyYXRpb24gd2FzIGF0dGVtcHRlZCBvbiBhIGZpZWxkIHRoYXQgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGRhdGEgc291cmNlLlxyXG4gICAqL1xyXG4gIEludmFsaWRGaWx0ZXJGaWVsZE5hbWUgPSAnaW52YWxpZC1maWx0ZXItZmllbGQtbmFtZScsXHJcbiAgLyoqXHJcbiAgICogQSBmaWx0ZXIgb3BlcmF0aW9uIHdhcyBhdHRlbXB0ZWQgdXNpbmcgYSB2YWx1ZSB0aGF0IGlzIHRoZSB3cm9uZyBkYXRhIHR5cGUgb3IgZm9ybWF0LlxyXG4gICAqL1xyXG4gIEludmFsaWRGaWx0ZXJGaWVsZFZhbHVlID0gJ2ludmFsaWQtZmlsdGVyLWZpZWxkLXZhbHVlJyxcclxuICAvKipcclxuICAgKiBBIHBhcmFtZXRlciBpcyBub3QgdGhlIGNvcnJlY3QgZGF0YSB0eXBlIG9yIGZvcm1hdC4gVGhlIG5hbWUgb2YgdGhlIHBhcmFtZXRlciBpcyBzcGVjaWZpZWQgaW4gdGhlIEVycm9yLm1lc3NhZ2UgZmllbGQuXHJcbiAgICovXHJcbiAgSW52YWxpZFBhcmFtZXRlciA9ICdpbnZhbGlkLXBhcmFtZXRlcicsXHJcbiAgLyoqXHJcbiAgICogQW4gaW52YWxpZCBkYXRlIHZhbHVlIHdhcyBzcGVjaWZpZWQgaW4gYSBTaGVldC5zZWxlY3RNYXJrc0FzeW5jKCkgY2FsbCBmb3IgYSBkYXRlIGZpZWxkLlxyXG4gICAqL1xyXG4gIEludmFsaWRTZWxlY3Rpb25EYXRlID0gJ2ludmFsaWQtc2VsZWN0aW9uLWRhdGUnLFxyXG4gIC8qKlxyXG4gICAqIEEgZmllbGQgd2FzIHNwZWNpZmllZCBpbiBhIFNoZWV0LnNlbGVjdE1hcmtzQXN5bmMoKSBjYWxsIHRoYXQgZG9lcyBub3QgZXhpc3QgaW4gdGhlIGRhdGEgc291cmNlLlxyXG4gICAqL1xyXG4gIEludmFsaWRTZWxlY3Rpb25GaWVsZE5hbWUgPSAnaW52YWxpZC1zZWxlY3Rpb24tZmllbGQtbmFtZScsXHJcbiAgLyoqXHJcbiAgICogQW4gaW52YWxpZCB2YWx1ZSB3YXMgc3BlY2lmaWVkIGluIGEgU2hlZXQuc2VsZWN0TWFya3NBc3luYygpIGNhbGwuXHJcbiAgICovXHJcbiAgSW52YWxpZFNlbGVjdGlvblZhbHVlID0gJ2ludmFsaWQtc2VsZWN0aW9uLXZhbHVlJyxcclxuICAvKipcclxuICAgKiBBIHJlcXVpcmVkIHBhcmFtZXRlciB3YXMgbm90IHNwZWNpZmllZCwgbnVsbCwgb3IgYW4gZW1wdHkgc3RyaW5nL2FycmF5LlxyXG4gICAqL1xyXG4gIE51bGxPckVtcHR5UGFyYW1ldGVyID0gJ251bGwtb3ItZW1wdHktcGFyYW1ldGVyJyxcclxuICAvKipcclxuICAgKiBBbiB1bmtub3duIGV2ZW50IG5hbWUgd2FzIHNwZWNpZmllZCBpbiB0aGUgY2FsbCB0byBWaXouYWRkRXZlbnRMaXN0ZW5lcm9yIFZpei5yZW1vdmVFdmVudExpc3RlbmVyLlxyXG4gICAqL1xyXG4gIFVuc3VwcG9ydGVkRXZlbnROYW1lID0gJ3Vuc3VwcG9ydGVkLWV2ZW50LW5hbWUnLFxyXG4gIC8qKlxyXG4gICAqIEEgbWV0aG9kIHdhcyB1c2VkIGZvciBhIHR5cGUgb2YgZGF0YXNvdXJjZSB0aGF0IGRvZXNuJ3Qgc3VwcG9ydCB0aGF0IG1ldGhvZCAoc2VlIGdldEFjdGl2ZVRhYmxlc0FzeW5jIGZvciBhbiBleGFtcGxlKVxyXG4gICAqL1xyXG4gIFVuc3VwcG9ydGVkTWV0aG9kRm9yRGF0YVNvdXJjZVR5cGUgPSAndW5zdXBwb3J0ZWQtbWV0aG9kLWZvci1kYXRhLXNvdXJjZS10eXBlJ1xyXG59XHJcblxyXG4vKipcclxuICogIFR5cGUgb2YgYWdncmVnYXRpb24gb24gYSBmaWVsZC5cclxuICovXHJcbmV4cG9ydCBlbnVtIEZpZWxkQWdncmVnYXRpb25UeXBlIHtcclxuICBTdW0gPSAnc3VtJyxcclxuICBBdmcgPSAnYXZnJyxcclxuICBNaW4gPSAnbWluJyxcclxuICBNYXggPSAnbWF4JyxcclxuICBTdGRldiA9ICdzdGRldicsXHJcbiAgU3RkZXZwID0gJ3N0ZGV2cCcsXHJcbiAgVmFyID0gJ3ZhcicsXHJcbiAgVmFycCA9ICd2YXJwJyxcclxuICBDb3VudCA9ICdjb3VudCcsXHJcbiAgQ291bnRkID0gJ2NvdW50ZCcsXHJcbiAgTWVkaWFuID0gJ21lZGlhbicsXHJcbiAgQXR0ciA9ICdhdHRyJyxcclxuICBOb25lID0gJ25vbmUnLFxyXG4gIFllYXIgPSAneWVhcicsXHJcbiAgUXRyID0gJ3F0cicsXHJcbiAgTW9udGggPSAnbW9udGgnLFxyXG4gIERheSA9ICdkYXknLFxyXG4gIEhvdXIgPSAnaG91cicsXHJcbiAgTWludXRlID0gJ21pbnV0ZScsXHJcbiAgU2Vjb25kID0gJ3NlY29uZCcsXHJcbiAgV2VlayA9ICd3ZWVrJyxcclxuICBXZWVrZGF5ID0gJ3dlZWtkYXknLFxyXG4gIE1vbnRoWWVhciA9ICdtb250aC15ZWFyJyxcclxuICBNZHkgPSAnbWR5JyxcclxuICBFbmQgPSAnZW5kJyxcclxuICBUcnVuY1llYXIgPSAndHJ1bmMteWVhcicsXHJcbiAgVHJ1bmNRdHIgPSAndHJ1bmMtcXRyJyxcclxuICBUcnVuY01vbnRoID0gJ3RydW5jLW1vbnRoJyxcclxuICBUcnVuY1dlZWsgPSAndHJ1bmMtd2VlaycsXHJcbiAgVHJ1bmNEYXkgPSAndHJ1bmMtZGF5JyxcclxuICBUcnVuY0hvdXIgPSAndHJ1bmMtaG91cicsXHJcbiAgVHJ1bmNNaW51dGUgPSAndHJ1bmMtbWludXRlJyxcclxuICBUcnVuY1NlY29uZCA9ICd0cnVuYy1zZWNvbmQnLFxyXG4gIFF1YXJ0MSA9ICdxdWFydDEnLFxyXG4gIFF1YXJ0MyA9ICdxdWFydDMnLFxyXG4gIFNrZXduZXNzID0gJ3NrZXduZXNzJyxcclxuICBLdXJ0b3NpcyA9ICdrdXJ0b3NpcycsXHJcbiAgSW5PdXQgPSAnaW4tb3V0JyxcclxuICBVc2VyID0gJ3VzZXInXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSb2xlIG9mIGEgZmllbGQuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBGaWVsZFJvbGVUeXBlIHtcclxuICBEaW1lbnNpb24gPSAnZGltZW5zaW9uJyxcclxuICBNZWFzdXJlID0gJ21lYXN1cmUnLFxyXG4gIFVua25vd24gPSAndW5rbm93bidcclxufVxyXG5cclxuLyoqXHJcbiAqIEFuIGVudW1lcmF0aW9uIG9mIHRoZSB2YWxpZCB0eXBlcyBvZiBmaWx0ZXJzIHRoYXQgY2FuIGJlIGFwcGxpZWQuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBGaWx0ZXJUeXBlIHtcclxuICBDYXRlZ29yaWNhbCA9ICdjYXRlZ29yaWNhbCcsXHJcbiAgUmFuZ2UgPSAncmFuZ2UnLFxyXG4gIEhpZXJhcmNoaWNhbCA9ICdoaWVyYXJjaGljYWwnLFxyXG4gIFJlbGF0aXZlRGF0ZSA9ICdyZWxhdGl2ZS1kYXRlJ1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIGRpZmZlcmVudCB1cGRhdGUgdHlwZXMgZm9yIGFwcGx5aW5nIGZpbHRlclxyXG4gKi9cclxuZXhwb3J0IGVudW0gRmlsdGVyVXBkYXRlVHlwZSB7XHJcbiAgQWRkID0gJ2FkZCcsXHJcbiAgQWxsID0gJ2FsbCcsXHJcbiAgUmVwbGFjZSA9ICdyZXBsYWNlJyxcclxuICBSZW1vdmUgPSAncmVtb3ZlJ1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIGRvbWFpbiB0eXBlIGZvciBhIGZpbHRlclxyXG4gKi9cclxuZXhwb3J0IGVudW0gRmlsdGVyRG9tYWluVHlwZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGRvbWFpbiB2YWx1ZXMgdGhhdCBhcmUgcmVsZXZhbnQgdG8gdGhlIHNwZWNpZmllZCBmaWx0ZXJcclxuICAgKiBpLmUuIHRoZSBkb21haW4gaXMgcmVzdHJpY3RlZCBieSBhIHByZXZpb3VzIGZpbHRlclxyXG4gICAqL1xyXG4gIFJlbGV2YW50ID0gJ3JlbGV2YW50JyxcclxuICAvKipcclxuICAgKiBsaXN0IG9mIGFsbCBwb3NzaWJsZSBkb21haW4gdmFsdWVzIGZyb20gZGF0YWJhc2VcclxuICAgKi9cclxuICBEYXRhYmFzZSA9ICdkYXRhYmFzZSdcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBvcHRpb24gZm9yIHNwZWNpZnlpbmcgd2hpY2ggdmFsdWVzIHRvIGluY2x1ZGUgZm9yIGZpbHRlcmluZ1xyXG4gKiBJbmRpY2F0ZXMgd2hhdCB0byBkbyB3aXRoIG51bGwgdmFsdWVzIGZvciBhIGdpdmVuIGZpbHRlciBvciBtYXJrIHNlbGVjdGlvbiBjYWxsLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gRmlsdGVyTnVsbE9wdGlvbiB7XHJcbiAgTnVsbFZhbHVlcyA9ICdudWxsLXZhbHVlcycsXHJcbiAgTm9uTnVsbFZhbHVlcyA9ICdub24tbnVsbC12YWx1ZXMnLFxyXG4gIEFsbFZhbHVlcyA9ICdhbGwtdmFsdWVzJ1xyXG59XHJcblxyXG4vKipcclxuICogVHlwZSBvZiBtYXJrIGZvciBhIGdpdmVuIG1hcmtzIGNhcmQgaW4gYSB2aXouXHJcbiAqL1xyXG5leHBvcnQgZW51bSBNYXJrVHlwZSB7XHJcbiAgQmFyID0gJ2JhcicsXHJcbiAgTGluZSA9ICdsaW5lJyxcclxuICBBcmVhID0gJ2FyZWEnLFxyXG4gIFNxdWFyZSA9ICdzcXVhcmUnLFxyXG4gIENpcmNsZSA9ICdjaXJjbGUnLFxyXG4gIFNoYXBlID0gJ3NoYXBlJyxcclxuICBUZXh0ID0gJ3RleHQnLFxyXG4gIE1hcCA9ICdtYXAnLFxyXG4gIFBpZSA9ICdwaWUnLFxyXG4gIEdhbnR0QmFyID0gJ2dhbnR0LWJhcicsXHJcbiAgUG9seWdvbiA9ICdwb2x5Z29uJ1xyXG59XHJcblxyXG4vKipcclxuICogQW4gZW51bWVyYXRpb24gZGVzY3JpYmluZyB0aGUgZGlmZmVyZW50IHR5cGVzIG9mIGFsbG93YWJsZSB2YWx1ZXMuXHJcbiAqIFRoaXMgaXMgdXNlZCBmb3IgcmVzdHJpY3RpbmcgdGhlIGRvbWFpbiBvZiBhIHBhcmFtZXRlclxyXG4gKi9cclxuZXhwb3J0IGVudW0gUGFyYW1ldGVyVmFsdWVUeXBlIHtcclxuICBBbGwgPSAnYWxsJyxcclxuICBMaXN0ID0gJ2xpc3QnLFxyXG4gIFJhbmdlID0gJ3JhbmdlJ1xyXG59XHJcblxyXG4vKipcclxuICogRGF0ZSBwZXJpb2QgdXNlZCBpbiBmaWx0ZXJzIGFuZCBpbiBwYXJhbWV0ZXJzLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gUGVyaW9kVHlwZSB7XHJcbiAgWWVhcnMgPSAneWVhcnMnLFxyXG4gIFF1YXJ0ZXJzID0gJ3F1YXJ0ZXJzJyxcclxuICBNb250aHMgPSAnbW9udGhzJyxcclxuICBXZWVrcyA9ICd3ZWVrcycsXHJcbiAgRGF5cyA9ICdkYXlzJyxcclxuICBIb3VycyA9ICdob3VycycsXHJcbiAgTWludXRlcyA9ICdtaW51dGVzJyxcclxuICBTZWNvbmRzID0gJ3NlY29uZHMnXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFF1aWNrVGFibGVDYWxjVHlwZSB7XHJcbiAgUnVubmluZ1RvdGFsID0gJ3J1bm5pbmctdG90YWwnLFxyXG4gIERpZmZlcmVuY2UgPSAnZGlmZmVyZW5jZScsXHJcbiAgUGVyY2VudERpZmZlcmVuY2UgPSAncGVyY2VudC1kaWZmZXJlbmNlJyxcclxuICBQZXJjZW50T2ZUb3RhbCA9ICdwZXJjZW50LW9mLXRvdGFsJyxcclxuICBSYW5rID0gJ3JhbmsnLFxyXG4gIFBlcmNlbnRpbGUgPSAncGVyY2VudGlsZScsXHJcbiAgTW92aW5nQXZlcmFnZSA9ICdtb3ZpbmctYXZlcmFnZScsXHJcbiAgWVREVG90YWwgPSAneXRkLXRvdGFsJyxcclxuICBDb21wb3VuZEdyb3d0aFJhdGUgPSAnY29tcG91bmQtZ3Jvd3RoLXJhdGUnLFxyXG4gIFllYXJPdmVyWWVhckdyb3d0aCA9ICd5ZWFyLW92ZXIteWVhci1ncm93dGgnLFxyXG4gIFlUREdyb3d0aCA9ICd5dGQtZ3Jvd3RoJyxcclxuICBVbmRlZmluZWQgPSAndW5kZWZpbmVkJ1xyXG59XHJcblxyXG4vKipcclxuICogRW51bSBmb3Igc3BlY2lmeWluZyB0aGUgc2VsZWN0aW9uIHR5cGUgZm9yIHNlbGVjdCBtYXJrcyBhcGkuXHJcbiAqL1xyXG5leHBvcnQgZW51bSBTZWxlY3Rpb25VcGRhdGVUeXBlIHtcclxuICBSZXBsYWNlID0gJ3NlbGVjdC1yZXBsYWNlJyxcclxuICBBZGQgPSAnc2VsZWN0LWFkZCcsXHJcbiAgUmVtb3ZlID0gJ3NlbGVjdC1yZW1vdmUnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgdHlwZSBvZiBzaGVldCBhIFNoZWV0IG9iamVjdCByZXByZXNlbnRzXHJcbiAqL1xyXG5leHBvcnQgZW51bSBTaGVldFR5cGUge1xyXG4gIERhc2hib2FyZCA9ICdkYXNoYm9hcmQnLFxyXG4gIFN0b3J5ID0gJ3N0b3J5JyxcclxuICBXb3Jrc2hlZXQgPSAnd29ya3NoZWV0J1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBTb3J0RGlyZWN0aW9uIHtcclxuICBJbmNyZWFzaW5nID0gJ2luY3JlYXNpbmcnLFxyXG4gIERlY3JlYXNpbmcgPSAnZGVjcmVhc2luZydcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBjZXJ0YWluIHR5cGUgb2YgZXZlbnQgd2hpY2ggY2FuIGJlIGxpc3RlbmVkIGZvclxyXG4gKi9cclxuZXhwb3J0IGVudW0gVGFibGVhdUV2ZW50VHlwZSB7XHJcbiAgLyoqIFJhaXNlZCB3aGVuIGFueSBmaWx0ZXIgaGFzIGNoYW5nZWQgc3RhdGUuKi9cclxuICBGaWx0ZXJDaGFuZ2VkID0gJ2ZpbHRlci1jaGFuZ2VkJyxcclxuXHJcbiAgLyoqIFRoZSBzZWxlY3RlZCBtYXJrcyBvbiBhIHZpc3VhbGl6YXRpb24gaGFzIGNoYW5nZWQgKi9cclxuICBNYXJrU2VsZWN0aW9uQ2hhbmdlZCA9ICdtYXJrLXNlbGVjdGlvbi1jaGFuZ2VkJyxcclxuXHJcbiAgLyoqIEEgcGFyYW1ldGVyIGhhcyBoYWQgaXRzIHZhbHVlIG1vZGlmaWVkICovXHJcbiAgUGFyYW1ldGVyQ2hhbmdlZCA9ICdwYXJhbWV0ZXItY2hhbmdlZCdcclxufVxyXG5cclxuZXhwb3J0IGVudW0gVHJlbmRMaW5lTW9kZWxUeXBlIHtcclxuICBMaW5lYXIgPSAnbGluZWFyJyxcclxuICBMb2dhcml0aG1pYyA9ICdsb2dhcml0aG1pYycsXHJcbiAgRXhwb25lbnRpYWwgPSAnZXhwb25lbnRpYWwnLFxyXG4gIFBvbHlub21pYWwgPSAncG9seW5vbWlhbCdcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvanMtYXBpL2FwaS1leHRlcm5hbC1jb250cmFjdC9zcmMvRW51bXMudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHsgVGFibGVhdVNoZWV0RXZlbnQgfSBmcm9tICcuL1RhYmxlYXVTaGVldEV2ZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZWF1V29ya3NoZWV0RXZlbnQgZXh0ZW5kcyBUYWJsZWF1U2hlZXRFdmVudCBpbXBsZW1lbnRzIENvbnRyYWN0LlRhYmxlYXVXb3Jrc2hlZXRFdmVudCB7XHJcbiAgcHVibGljIGdldCB3b3Jrc2hlZXQoKTogQ29udHJhY3QuV29ya3NoZWV0IHtcclxuICAgIHJldHVybiB0aGlzLl93b3Jrc2hlZXQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IodHlwZTogQ29udHJhY3QuVGFibGVhdUV2ZW50VHlwZSwgcHJvdGVjdGVkIF93b3Jrc2hlZXQ6IENvbnRyYWN0LldvcmtzaGVldCkge1xyXG4gICAgc3VwZXIodHlwZSwgX3dvcmtzaGVldCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRXZlbnRzL1RhYmxlYXVXb3Jrc2hlZXRFdmVudC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5pbXBvcnQgeyBUYWJsZWF1RXZlbnQgfSBmcm9tICcuL1RhYmxlYXVFdmVudCc7XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGVhdVNoZWV0RXZlbnQgZXh0ZW5kcyBUYWJsZWF1RXZlbnQgaW1wbGVtZW50cyBDb250cmFjdC5UYWJsZWF1U2hlZXRFdmVudCB7XHJcbiAgcHJpdmF0ZSBfc2hlZXQ6IENvbnRyYWN0LlNoZWV0O1xyXG5cclxuICBwdWJsaWMgZ2V0IHNoZWV0KCk6IENvbnRyYWN0LlNoZWV0IHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih0eXBlOiBDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlLCBzaGVldDogQ29udHJhY3QuU2hlZXQpIHtcclxuICAgIHN1cGVyKHR5cGUpO1xyXG5cclxuICAgIHRoaXMuX3NoZWV0ID0gc2hlZXQ7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRXZlbnRzL1RhYmxlYXVTaGVldEV2ZW50LnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZWF1RXZlbnQgaW1wbGVtZW50cyBDb250cmFjdC5UYWJsZWF1RXZlbnQge1xyXG4gIHByaXZhdGUgX3R5cGU6IENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGU7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcih0eXBlOiBDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlKSB7XHJcbiAgICB0aGlzLl90eXBlID0gdHlwZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLl90eXBlO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL0V2ZW50cy9UYWJsZWF1RXZlbnQudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHsgVGFibGVhdVdvcmtzaGVldEV2ZW50IH0gZnJvbSAnLi9UYWJsZWF1V29ya3NoZWV0RXZlbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hcmtzU2VsZWN0ZWRFdmVudCBleHRlbmRzIFRhYmxlYXVXb3Jrc2hlZXRFdmVudCBpbXBsZW1lbnRzIENvbnRyYWN0Lk1hcmtzU2VsZWN0ZWRFdmVudCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHdvcmtzaGVldDogQ29udHJhY3QuV29ya3NoZWV0KSB7XHJcbiAgICBzdXBlcihDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlLk1hcmtTZWxlY3Rpb25DaGFuZ2VkLCB3b3Jrc2hlZXQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1hcmtzQXN5bmMoKTogUHJvbWlzZTxDb250cmFjdC5NYXJrc0NvbGxlY3Rpb24+IHtcclxuICAgIHJldHVybiB0aGlzLndvcmtzaGVldC5nZXRTZWxlY3RlZE1hcmtzQXN5bmMoKTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9FdmVudHMvTWFya3NTZWxlY3RlZEV2ZW50LnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IFNpbmdsZUV2ZW50TWFuYWdlciB9IGZyb20gJy4uL1NpbmdsZUV2ZW50TWFuYWdlcic7XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyBpbXBsZW1lbnRzIHRoZSBTaW5nbGVFdmVudE1hbmFnZXIgaW50ZXJmYWNlIGZvciBhIHNpbmdsZSB0eXBlIG9mIFRhYmxlYXUgZXZlbnRcclxuICpcclxuICogQHRlbXBsYXRlIFRFdmVudFR5cGUgVGhlIFRhYmxlYXUgZXZlbnQgdHlwZSB0aGlzIGNsYXNzIHNwZWNpYWxpemVzXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2luZ2xlRXZlbnRNYW5hZ2VySW1wbDxURXZlbnRUeXBlIGV4dGVuZHMgQ29udHJhY3QuVGFibGVhdUV2ZW50PiBpbXBsZW1lbnRzIFNpbmdsZUV2ZW50TWFuYWdlciB7XHJcbiAgcHJpdmF0ZSBfZXZlbnRUeXBlOiBDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlO1xyXG4gIHByaXZhdGUgX2hhbmRsZXJzOiBBcnJheTwoZXZlbnRPYmo6IFRFdmVudFR5cGUpID0+IHZvaWQ+O1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoZXZlbnRUeXBlOiBDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlKSB7XHJcbiAgICB0aGlzLl9ldmVudFR5cGUgPSBldmVudFR5cGU7XHJcbiAgICB0aGlzLl9oYW5kbGVycyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBldmVudFR5cGUoKTogQ29udHJhY3QuVGFibGVhdUV2ZW50VHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRUeXBlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZEV2ZW50TGlzdGVuZXIoaGFuZGxlcjogKGV2ZW50T2JqOiBURXZlbnRUeXBlKSA9PiB2b2lkKTogQ29udHJhY3QuVGFibGVhdUV2ZW50VW5yZWdpc3RlckZuIHtcclxuICAgIHRoaXMuX2hhbmRsZXJzLnB1c2goaGFuZGxlcik7XHJcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoaGFuZGxlcjogKGV2ZW50T2JqOiBURXZlbnRUeXBlKSA9PiB2b2lkKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBiZWZvcmVDb3VudCA9IHRoaXMuX2hhbmRsZXJzLmxlbmd0aDtcclxuICAgIHRoaXMuX2hhbmRsZXJzID0gdGhpcy5faGFuZGxlcnMuZmlsdGVyKGggPT4gaCAhPT0gaGFuZGxlcik7XHJcbiAgICByZXR1cm4gYmVmb3JlQ291bnQgPiB0aGlzLl9oYW5kbGVycy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdHJpZ2dlckV2ZW50KGV2ZW50R2VuZXJhdG9yOiAoKSA9PiBURXZlbnRUeXBlKTogdm9pZCB7XHJcbiAgICBmb3IgKGNvbnN0IGhhbmRsZXIgb2YgdGhpcy5faGFuZGxlcnMpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBldmVudE1vZGVsID0gZXZlbnRHZW5lcmF0b3IoKTtcclxuICAgICAgICBoYW5kbGVyKGV2ZW50TW9kZWwpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgLy8gU2luY2UgdGhpcyBoYW5kbGVyIGNvdWxkIGJlIG91dHNpZGUgb3VyIGNvbnRyb2wsIGp1c3QgY2F0Y2ggYW55dGhpbmcgaXQgdGhyb3dzIGFuZCBjb250aW51ZSBvblxyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvSW50ZXJuYWwvU2luZ2xlRXZlbnRNYW5hZ2VySW1wbC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IFZpc3VhbElkIH0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuL1NlcnZpY2VSZWdpc3RyeSc7XHJcblxyXG4vKipcclxuICogRGVmaW5lcyB3aGljaCB0eXBlIG9mIGdldERhdGEgY2FsbCB0byBtYWtlLlxyXG4gKi9cclxuZXhwb3J0IGVudW0gR2V0RGF0YVR5cGUge1xyXG4gIFN1bW1hcnkgPSAnc3VtbWFyeScsXHJcbiAgVW5kZXJseWluZyA9ICd1bmRlcmx5aW5nJ1xyXG59XHJcblxyXG4vKipcclxuICogU2VydmljZSBmb3IgaW1wbGVtZW50aW5nIHRoZSBsb2dpYyBmb3IgdmFyaW91cyBnZXREYXRhIGNhbGxzXHJcbiAqXHJcbiAqIEBpbnRlcmZhY2UgR2V0RGF0YVNlcnZpY2VcclxuICogQGV4dGVuZHMge0FwaVNlcnZpY2V9XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEdldERhdGFTZXJ2aWNlIGV4dGVuZHMgQXBpU2VydmljZSB7XHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgdW5kZXJseWluZyBkYXRhIGZvciBhIHBhcnRpY3VsYXIgdmlzdWFsXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1Zpc3VhbElkfSB2aXN1YWxJZCAgVGhlIHZpc3VhbCB0byBnZXQgZGF0YSBmb3JcclxuICAgKiBAcGFyYW0ge0dldERhdGFUeXBlfSBnZXRUeXBlICBUaGUgdHlwZSBvZiBnZXREYXRhIGNhbGwgdG8gbWFrZVxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlQWxpYXNlcyAgV2hldGhlciBvciBub3QgYWxpYXNlcyBzaG91bGQgYmUgaWdub3JlZFxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlU2VsZWN0aW9uICBXaGV0aGVyIG9yIG5vdCBzZWxlY3Rpb24gc2hvdWxkIGJlIGlnbm9yZWRcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGluY2x1ZGVBbGxDb2x1bW5zICBTaG91bGQgYWxsIGNvbHVtbnMgYmUgaW5jbHVkZWRcclxuICAgKiBAcGFyYW0ge251bWJlcn0gbWF4Um93cyAgTWF4aW11bSBudW1iZXIgb2Ygcm93cyB0byByZXR1cm5cclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDb250cmFjdC5EYXRhVGFibGU+fSAgRGF0YSB0YWJsZSB3aXRoIHRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAqL1xyXG4gICAgZ2V0VW5kZXJseWluZ0RhdGFBc3luYyhcclxuICAgICAgdmlzdWFsSWQ6IFZpc3VhbElkLFxyXG4gICAgICBnZXRUeXBlOiBHZXREYXRhVHlwZSxcclxuICAgICAgaWdub3JlQWxpYXNlczogYm9vbGVhbixcclxuICAgICAgaWdub3JlU2VsZWN0aW9uOiBib29sZWFuLFxyXG4gICAgICBpbmNsdWRlQWxsQ29sdW1uczogYm9vbGVhbixcclxuICAgICAgbWF4Um93czogbnVtYmVyKTogUHJvbWlzZTxDb250cmFjdC5EYXRhVGFibGU+O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIG1hcmtzIGZvciBhIGdpdmVuIHZpc3VhbFxyXG4gICAgICpcclxuICAgICogQHBhcmFtIHtWaXN1YWxJZH0gdmlzdWFsSWQgIFRoZSB2aXN1YWwgdG8gZ2V0IGRhdGEgZm9yXHJcbiAgICAqIEByZXR1cm5zIHtQcm9taXNlPEFjdGl2ZU1hcmtzPn0gIENvbGxlY3Rpb24gb2YgZGF0YSB0YWJsZXMgd2l0aCB0aGUgYWN0aXZlIG1hcmtzXHJcbiAgICAqL1xyXG4gICAgZ2V0U2VsZWN0ZWRNYXJrc0FzeW5jKHZpc3VhbElkOiBWaXN1YWxJZCk6IFByb21pc2U8Q29udHJhY3QuTWFya3NDb2xsZWN0aW9uPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIGN1cnJlbnRseSBoaWdobGlnaHRlZCBtYXJrcyBmb3IgYSBnaXZlbiB2aXN1YWxcclxuICAgICAqXHJcbiAgICAqIEBwYXJhbSB7VmlzdWFsSWR9IHZpc3VhbElkICBUaGUgdmlzdWFsIHRvIGdldCBkYXRhIGZvclxyXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBY3RpdmVNYXJrcz59ICBDb2xsZWN0aW9uIG9mIGRhdGEgdGFibGVzIHdpdGggdGhlIGFjdGl2ZSBtYXJrc1xyXG4gICAgKi9cclxuICAgIGdldEhpZ2hsaWdodGVkTWFya3NBc3luYyh2aXN1YWxJZDogVmlzdWFsSWQpOiBQcm9taXNlPENvbnRyYWN0Lk1hcmtzQ29sbGVjdGlvbj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YXNvdXJjZUlkICBUaGUgaWQgb2YgdGhlIGRhdGFzb3VyY2UgdG8gZ2V0IGRhdGEgZm9yXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZUFsaWFzZXMgIFdoZXRoZXIgYWxpYXMgdmFsdWVzIHNob3VsZCBiZSBpZ25vcmVkIGluIHRoZSByZXR1cm5lZCBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4Um93cyBUaGUgbWF4aW11bSBudW1iZXIgb2Ygcm93cyB0byByZXRyaWV2ZVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBjb2x1bW5zVG9JbmNsdWRlICBDb2xsZWN0aW9uIG9mIGNvbHVtbiBjYXB0aW9ucyB3aGljaCBzaG91bGQgYmUgcmV0dXJuZWQuIEVtcHR5IG1lYW5zIGFsbCBjb2x1bW5zXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDb250cmFjdC5EYXRhVGFibGU+fSAgRGF0YSB0YWJsZSB3aXRoIHRoZSByZXF1ZXN0ZWQgZGF0YVxyXG4gICAgICovXHJcbiAgICBnZXREYXRhU291cmNlRGF0YUFzeW5jKFxyXG4gICAgICBkYXRhc291cmNlSWQ6IHN0cmluZyxcclxuICAgICAgaWdub3JlQWxpYXNlczogYm9vbGVhbixcclxuICAgICAgbWF4Um93czogbnVtYmVyLFxyXG4gICAgICBjb2x1bW5zVG9JbmNsdWRlOiBBcnJheTxzdHJpbmc+KTogUHJvbWlzZTxDb250cmFjdC5EYXRhVGFibGU+O1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvU2VydmljZXMvR2V0RGF0YVNlcnZpY2UudHNcbiAqKi8iLCJpbXBvcnQgeyBJbnRlcm5hbEFwaURpc3BhdGNoZXIgfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZVNlcnZpY2VJbXBsIH0gZnJvbSAnLi9pbXBsL0RhdGFTb3VyY2VTZXJ2aWNlSW1wbCc7XHJcbmltcG9ydCB7IEZpbHRlclNlcnZpY2VJbXBsIH0gZnJvbSAnLi9pbXBsL0ZpbHRlclNlcnZpY2VJbXBsJztcclxuaW1wb3J0IHsgR2V0RGF0YVNlcnZpY2VJbXBsIH0gZnJvbSAnLi9pbXBsL0dldERhdGFTZXJ2aWNlSW1wbCc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2VJbXBsIH0gZnJvbSAnLi9pbXBsL05vdGlmaWNhdGlvblNlcnZpY2VJbXBsJztcclxuaW1wb3J0IHsgUGFyYW1ldGVyc1NlcnZpY2VJbXBsIH0gZnJvbSAnLi9pbXBsL1BhcmFtZXRlcnNTZXJ2aWNlSW1wbCc7XHJcbmltcG9ydCB7IFNlbGVjdGlvblNlcnZpY2VJbXBsIH0gZnJvbSAnLi9pbXBsL1NlbGVjdGlvblNlcnZpY2VJbXBsJztcclxuaW1wb3J0IHsgQXBpU2VydmljZVJlZ2lzdHJ5IH0gZnJvbSAnLi9TZXJ2aWNlUmVnaXN0cnknO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQWxsU2hhcmVkU2VydmljZXMoZGlzcGF0Y2hlcjogSW50ZXJuYWxBcGlEaXNwYXRjaGVyKTogdm9pZCB7XHJcbiAgQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLnJlZ2lzdGVyU2VydmljZShuZXcgRGF0YVNvdXJjZVNlcnZpY2VJbXBsKGRpc3BhdGNoZXIpKTtcclxuICBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UucmVnaXN0ZXJTZXJ2aWNlKG5ldyBHZXREYXRhU2VydmljZUltcGwoZGlzcGF0Y2hlcikpO1xyXG4gIEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5yZWdpc3RlclNlcnZpY2UobmV3IEZpbHRlclNlcnZpY2VJbXBsKGRpc3BhdGNoZXIpKTtcclxuICBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UucmVnaXN0ZXJTZXJ2aWNlKG5ldyBOb3RpZmljYXRpb25TZXJ2aWNlSW1wbChkaXNwYXRjaGVyKSk7XHJcbiAgQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLnJlZ2lzdGVyU2VydmljZShuZXcgUGFyYW1ldGVyc1NlcnZpY2VJbXBsKGRpc3BhdGNoZXIpKTtcclxuICBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UucmVnaXN0ZXJTZXJ2aWNlKG5ldyBTZWxlY3Rpb25TZXJ2aWNlSW1wbChkaXNwYXRjaGVyKSk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9SZWdpc3RlckFsbFNoYXJlZFNlcnZpY2VzLnRzXG4gKiovIiwiaW1wb3J0IHsgRXJyb3JDb2RlcyB9IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7XHJcbiAgRGF0YVNjaGVtYSxcclxuICBFeGVjdXRlUGFyYW1ldGVycyxcclxuICBJbnRlcm5hbEFwaURpc3BhdGNoZXIsXHJcbiAgSm9pbkRlc2NyaXB0aW9uLFxyXG4gIFBhcmFtZXRlcklkLFxyXG4gIFRhYmxlSW5mbyxcclxuICBWZXJiSWRcclxufSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHsgVGFibGVhdUV4Y2VwdGlvbiB9IGZyb20gJ0B0YWJsZWF1L2FwaS11dGlscyc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU291cmNlU2VydmljZSB9IGZyb20gJy4uL0RhdGFTb3VyY2VTZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vU2VydmljZVJlZ2lzdHJ5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhU291cmNlU2VydmljZUltcGwgaW1wbGVtZW50cyBEYXRhU291cmNlU2VydmljZSB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Rpc3BhdGNoZXI6IEludGVybmFsQXBpRGlzcGF0Y2hlcikgeyB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2VydmljZU5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBTZXJ2aWNlTmFtZXMuRGF0YVNvdXJjZVNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVmcmVzaEFzeW5jKGRhdGFTb3VyY2VJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHtbUGFyYW1ldGVySWQuRGF0YVNvdXJjZUlkXTogZGF0YVNvdXJjZUlkfTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5SZWZyZXNoRGF0YVNvdXJjZSwgcGFyYW1ldGVycykudGhlbjx2b2lkPihyZXNwb25zZSA9PiB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEFjdGl2ZVRhYmxlc0FzeW5jKGRhdGFTb3VyY2VJZDogc3RyaW5nKTogUHJvbWlzZTxUYWJsZUluZm9bXT4ge1xyXG4gICAgY29uc3Qgam9pblBhcmFtZXRlcnM6IEV4ZWN1dGVQYXJhbWV0ZXJzID0ge1tQYXJhbWV0ZXJJZC5EYXRhU291cmNlSWRdOiBkYXRhU291cmNlSWR9O1xyXG5cclxuICAgIC8vIEdldCB0aGUgZGVzY3JpcHRpb24gb2YgdGhlIHRhYmxlcyB1c2VkIGJ5IHRoaXMgY29ubmVjdGlvblxyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZXhlY3V0ZShWZXJiSWQuR2V0Sm9pbkRlc2NyaXB0aW9uLCBqb2luUGFyYW1ldGVycykudGhlbjxUYWJsZUluZm9bXT4oam9pblJlc3BvbnNlID0+IHtcclxuICAgICAgY29uc3Qgam9pbkRlc2NyaXB0aW9uID0gam9pblJlc3BvbnNlLnJlc3VsdCBhcyBKb2luRGVzY3JpcHRpb247XHJcblxyXG4gICAgICAvLyBnZXRBY3RpdmVUYWJsZXMgaXMgdW5zdXBwb3J0ZWQgZm9yIGN1YmVzIGFuZCBHQS4gV2UgZG8gbm90IGhhdmUgYSBjb25uZWN0aW9uIHR5cGUgcHJvcGVydHlcclxuICAgICAgLy8gYXZhaWxhYmxlIGZyb20gdGhlIHBsYXRmb3JtIChpbnRlbnRpb25hbGx5LCB0byByZWR1Y2UgY29kZSBjaHVybiBhcyBuZXcgY29ubmVjdGlvbnMgYXJlIGFkZGVkKS5cclxuICAgICAgLy8gSW5zdGVhZCxqdXN0IGNoZWNrIGlmIGFueSB0YWJsZXMgYXJlIHJldHVybmVkLiBUaGlzIGFycmF5IHdpbGwgYmUgZW1wdHkgZm9yIGFueSBub24tdGFibGUgYmFzZWQgZGF0YXNvdXJjZS5cclxuICAgICAgaWYgKGpvaW5EZXNjcmlwdGlvbi50YWJsZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5lcnJvcignZ2V0QWN0aXZlVGFibGVzQXN5bmMgaXMgdW5zdXBwb3J0ZWQgZm9yIERhdGFTb3VyY2UuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbRXJyb3JDb2Rlcy5VbnN1cHBvcnRlZE1ldGhvZEZvckRhdGFTb3VyY2VUeXBlXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBqb2luRGVzY3JpcHRpb24udGFibGVzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RGF0YVNvdXJjZXNBc3luYygpOiBQcm9taXNlPERhdGFTY2hlbWE+IHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmV4ZWN1dGUoVmVyYklkLkdldERhdGFTb3VyY2VzLCB7fSkudGhlbjxEYXRhU2NoZW1hPihyZXNwb25zZSA9PiB7XHJcbiAgICAgIGNvbnN0IGRhdGFTY2hlbWEgPSByZXNwb25zZS5yZXN1bHQgYXMgRGF0YVNjaGVtYTtcclxuICAgICAgcmV0dXJuIGRhdGFTY2hlbWE7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9pbXBsL0RhdGFTb3VyY2VTZXJ2aWNlSW1wbC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCAqIGFzIEludGVybmFsQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHtcclxuICBDb21tYW5kRXJyb3IsXHJcbiAgRXhlY3V0ZVBhcmFtZXRlcnMsXHJcbiAgRmlsdGVyVHlwZSxcclxuICBJbnRlcm5hbEFwaURpc3BhdGNoZXIsXHJcbiAgUGFyYW1ldGVySWQsXHJcbiAgVmVyYklkLFxyXG4gIFZpc3VhbElkXHJcbn0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgUGFyYW0sIFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRXh0ZXJuYWxUb0ludGVybmFsRW51bU1hcHBpbmdzIGFzIEV4dGVybmFsRW51bUNvbnZlcnRlciB9IGZyb20gJy4uLy4uL0VudW1NYXBwaW5ncy9FeHRlcm5hbFRvSW50ZXJuYWxFbnVtTWFwcGluZ3MnO1xyXG5pbXBvcnQgeyBJbnRlcm5hbFRvRXh0ZXJuYWxFbnVtTWFwcGluZ3MgYXMgSW50ZXJuYWxFbnVtQ29udmVydGVyIH0gZnJvbSAnLi4vLi4vRW51bU1hcHBpbmdzL0ludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncyc7XHJcbmltcG9ydCB7XHJcbiAgQ2F0ZWdvcmljYWxEb21haW4sXHJcbiAgQ2F0ZWdvcmljYWxGaWx0ZXIsXHJcbiAgUmFuZ2VEb21haW4sXHJcbiAgUmFuZ2VGaWx0ZXIsXHJcbiAgUmVsYXRpdmVEYXRlRmlsdGVyXHJcbn0gZnJvbSAnLi4vLi4vTW9kZWxzL0ZpbHRlck1vZGVscyc7XHJcbmltcG9ydCB7IERhdGFWYWx1ZSB9IGZyb20gJy4uLy4uL01vZGVscy9HZXREYXRhTW9kZWxzJztcclxuXHJcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi9GaWx0ZXJTZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vU2VydmljZVJlZ2lzdHJ5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXJTZXJ2aWNlSW1wbCBpbXBsZW1lbnRzIEZpbHRlclNlcnZpY2Uge1xyXG4gIHByaXZhdGUgc3RhdGljIEZJTFRFUl9FUlJPUjogc3RyaW5nID0gJ0Vycm9yIEFwcGx5aW5nIEZpbHRlcjogJTEnO1xyXG4gIHByaXZhdGUgX2Rpc3BhdGNoZXI6IEludGVybmFsQXBpRGlzcGF0Y2hlcjtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKGRpc3BhdGNoZXI6IEludGVybmFsQXBpRGlzcGF0Y2hlcikge1xyXG4gICAgdGhpcy5fZGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNlcnZpY2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU2VydmljZU5hbWVzLkZpbHRlcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhcHBseUZpbHRlckFzeW5jKFxyXG4gICAgdmlzdWFsSWQ6IFZpc3VhbElkLFxyXG4gICAgZmllbGROYW1lOiBzdHJpbmcsXHJcbiAgICB2YWx1ZXM6IEFycmF5PHN0cmluZz4sXHJcbiAgICB1cGRhdGVUeXBlOiBDb250cmFjdC5GaWx0ZXJVcGRhdGVUeXBlLFxyXG4gICAgZmlsdGVyT3B0aW9uczogQ29udHJhY3QuRmlsdGVyT3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgIGlmICghUGFyYW0uaXNWYWxpZEVudW1WYWx1ZTxDb250cmFjdC5GaWx0ZXJVcGRhdGVUeXBlPih1cGRhdGVUeXBlLCBDb250cmFjdC5GaWx0ZXJVcGRhdGVUeXBlKSkge1xyXG4gICAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uaW52YWxpZFBhcmFtVmFsdWUoWydGaWx0ZXJVcGRhdGVUeXBlJ10pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHZlcmIgPSBWZXJiSWQuQXBwbHlDYXRlZ29yaWNhbEZpbHRlcjtcclxuICAgICAgY29uc3QgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMgPSB7fTtcclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5WaXN1YWxJZF0gPSB2aXN1YWxJZDtcclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5GaWVsZE5hbWVdID0gZmllbGROYW1lO1xyXG4gICAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLkZpbHRlclZhbHVlc10gPSB2YWx1ZXM7XHJcbiAgICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuRmlsdGVyVXBkYXRlVHlwZV0gPSB1cGRhdGVUeXBlO1xyXG4gICAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLklzRXhjbHVkZU1vZGVdID1cclxuICAgICAgICAoZmlsdGVyT3B0aW9ucyA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlck9wdGlvbnMuaXNFeGNsdWRlTW9kZSA9PT0gdW5kZWZpbmVkKSA/IGZhbHNlIDogZmlsdGVyT3B0aW9ucy5pc0V4Y2x1ZGVNb2RlO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZXhlY3V0ZSh2ZXJiLCBwYXJhbWV0ZXJzKS50aGVuPHN0cmluZz4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVycm9yID0gcmVzcG9uc2UucmVzdWx0IGFzIENvbW1hbmRFcnJvcjtcclxuICAgICAgICBpZiAoIShlcnJvci5lcnJvckNvZGUgPT09IG51bGwgfHwgZXJyb3IuZXJyb3JDb2RlID09PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgICAvLyBUT0RPOiBjb21lIGJhY2sgYW5kIGltcGxlbWVudCBlcnJvciBoYW5kbGluZyBsb2dpY1xyXG4gICAgICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5lcnJvcihGaWx0ZXJTZXJ2aWNlSW1wbC5GSUxURVJfRVJST1IsIFtlcnJvci5lcnJvckNvZGVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZpZWxkTmFtZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIHB1YmxpYyBhcHBseVJhbmdlRmlsdGVyQXN5bmModmlzdWFsSWQ6IFZpc3VhbElkLCBmaWVsZE5hbWU6IHN0cmluZywgZmlsdGVyT3B0aW9uczogQ29udHJhY3QuUmFuZ2VGaWx0ZXJPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIGlmICghZmlsdGVyT3B0aW9ucykge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLm1pc3NpbmdQYXJhbWV0ZXIoWydSYW5nZUZpbHRlck9wdGlvbnMnXSk7XHJcbiAgICB9XHJcbiAgICBQYXJhbS52ZXJpZnlSYW5nZVBhcmFtVHlwZShmaWx0ZXJPcHRpb25zLm1pbiwgZmlsdGVyT3B0aW9ucy5tYXgpO1xyXG5cclxuICAgIGNvbnN0IHZlcmIgPSBWZXJiSWQuQXBwbHlSYW5nZUZpbHRlcjtcclxuICAgIGNvbnN0IHBhcmFtZXRlcnM6IEV4ZWN1dGVQYXJhbWV0ZXJzID0ge307XHJcblxyXG4gICAgaWYgKGZpbHRlck9wdGlvbnMubWluKSB7XHJcbiAgICAgIGxldCBtaW46IHN0cmluZyB8IG51bWJlcjtcclxuICAgICAgaWYgKGZpbHRlck9wdGlvbnMubWluIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgIG1pbiA9IFBhcmFtLnNlcmlhbGl6ZURhdGVGb3JQbGF0Zm9ybShmaWx0ZXJPcHRpb25zLm1pbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWluID0gZmlsdGVyT3B0aW9ucy5taW47XHJcbiAgICAgIH1cclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5GaWx0ZXJSYW5nZU1pbl0gPSBtaW47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZpbHRlck9wdGlvbnMubWF4KSB7XHJcbiAgICAgIGxldCBtYXg6IHN0cmluZyB8IG51bWJlcjtcclxuICAgICAgaWYgKGZpbHRlck9wdGlvbnMubWF4IGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgIG1heCA9IFBhcmFtLnNlcmlhbGl6ZURhdGVGb3JQbGF0Zm9ybShmaWx0ZXJPcHRpb25zLm1heCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWF4ID0gZmlsdGVyT3B0aW9ucy5tYXg7XHJcbiAgICAgIH1cclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5GaWx0ZXJSYW5nZU1heF0gPSBtYXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZpbHRlck9wdGlvbnMubnVsbE9wdGlvbikge1xyXG4gICAgICBpZiAoIVBhcmFtLmlzVmFsaWRFbnVtVmFsdWU8Q29udHJhY3QuRmlsdGVyTnVsbE9wdGlvbj4oZmlsdGVyT3B0aW9ucy5udWxsT3B0aW9uLCBDb250cmFjdC5GaWx0ZXJOdWxsT3B0aW9uKSkge1xyXG4gICAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uaW52YWxpZFBhcmFtVmFsdWUoWydOdWxsT3B0aW9uJ10pO1xyXG4gICAgICB9XHJcbiAgICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuRmlsdGVyUmFuZ2VOdWxsT3B0aW9uXSA9IEV4dGVybmFsRW51bUNvbnZlcnRlci5udWxsT3B0aW9ucy5jb252ZXJ0KGZpbHRlck9wdGlvbnMubnVsbE9wdGlvbik7XHJcbiAgICB9XHJcbiAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLkZpZWxkTmFtZV0gPSBmaWVsZE5hbWU7XHJcbiAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLlZpc3VhbElkXSA9IHZpc3VhbElkO1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmV4ZWN1dGUodmVyYiwgcGFyYW1ldGVycykudGhlbjxzdHJpbmc+KHJlc3BvbnNlID0+IHtcclxuICAgICAgcmV0dXJuIGZpZWxkTmFtZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyRmlsdGVyQXN5bmModmlzdWFsSWQ6IFZpc3VhbElkLCBmaWVsZE5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBjb25zdCB2ZXJiID0gVmVyYklkLkNsZWFyRmlsdGVyO1xyXG4gICAgbGV0IHBhcmFtZXRlcnM6IEV4ZWN1dGVQYXJhbWV0ZXJzID0ge307XHJcbiAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLlZpc3VhbElkXSA9IHZpc3VhbElkO1xyXG4gICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5GaWVsZE5hbWVdID0gZmllbGROYW1lO1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZXhlY3V0ZSh2ZXJiLCBwYXJhbWV0ZXJzKS50aGVuPHN0cmluZz4ocmVzcG9zbmUgPT4ge1xyXG4gICAgICByZXR1cm4gZmllbGROYW1lO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RmlsdGVyc0FzeW5jKHZpc3VhbElkOiBWaXN1YWxJZCk6IFByb21pc2U8Q29udHJhY3QuRmlsdGVyW10+IHtcclxuICAgIGNvbnN0IHZlcmIgPSBWZXJiSWQuR2V0RmlsdGVycztcclxuICAgIGxldCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHt9O1xyXG4gICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5WaXN1YWxJZF0gPSB2aXN1YWxJZDtcclxuICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmV4ZWN1dGUodmVyYiwgcGFyYW1ldGVycykudGhlbjxDb250cmFjdC5GaWx0ZXJbXT4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICBsZXQgZmlsdGVycyA9IHJlc3BvbnNlLnJlc3VsdCBhcyBJbnRlcm5hbENvbnRyYWN0LkZpbHRlcltdO1xyXG4gICAgICByZXR1cm4gdGhpcy5jb252ZXJ0RG9tYWluRmlsdGVycyhmaWx0ZXJzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENhdGVnb3JpY2FsRG9tYWluQXN5bmMoXHJcbiAgICB3b3Jrc2hlZXROYW1lOiBzdHJpbmcsXHJcbiAgICBmaWVsZElkOiBzdHJpbmcsXHJcbiAgICBkb21haW5UeXBlOiBDb250cmFjdC5GaWx0ZXJEb21haW5UeXBlKTogUHJvbWlzZTxDb250cmFjdC5DYXRlZ29yaWNhbERvbWFpbj4ge1xyXG4gICAgaWYgKCFQYXJhbS5pc1ZhbGlkRW51bVZhbHVlPENvbnRyYWN0LkZpbHRlckRvbWFpblR5cGU+KGRvbWFpblR5cGUsIENvbnRyYWN0LkZpbHRlckRvbWFpblR5cGUpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyIEZpbHRlckRvbWFpblR5cGUnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHZlcmIgPSBWZXJiSWQuR2V0Q2F0ZWdvcmljYWxEb21haW47XHJcbiAgICBsZXQgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMgPSB7fTtcclxuICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuVmlzdWFsSWRdID0ge1xyXG4gICAgICB3b3Jrc2hlZXQ6IHdvcmtzaGVldE5hbWVcclxuICAgIH07XHJcbiAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLkZpZWxkSWRdID0gZmllbGRJZDtcclxuICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuRG9tYWluVHlwZV0gPSBkb21haW5UeXBlO1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZXhlY3V0ZSh2ZXJiLCBwYXJhbWV0ZXJzKS50aGVuPENvbnRyYWN0LkNhdGVnb3JpY2FsRG9tYWluPihyZXNwb25zZSA9PiB7XHJcbiAgICAgIGxldCBkb21haW4gPSByZXNwb25zZS5yZXN1bHQgYXMgSW50ZXJuYWxDb250cmFjdC5DYXRlZ29yaWNhbERvbWFpbjtcclxuICAgICAgcmV0dXJuIHRoaXMuY29udmVydENhdGVnb3JpY2FsRG9tYWluKGRvbWFpbiwgZG9tYWluVHlwZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRSYW5nZURvbWFpbkFzeW5jKHdvcmtzaGVldE5hbWU6IHN0cmluZywgZmllbGRJZDogc3RyaW5nLCBkb21haW5UeXBlOiBDb250cmFjdC5GaWx0ZXJEb21haW5UeXBlKTogUHJvbWlzZTxDb250cmFjdC5SYW5nZURvbWFpbj4ge1xyXG4gICAgaWYgKCFQYXJhbS5pc1ZhbGlkRW51bVZhbHVlPENvbnRyYWN0LkZpbHRlckRvbWFpblR5cGU+KGRvbWFpblR5cGUsIENvbnRyYWN0LkZpbHRlckRvbWFpblR5cGUpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyIEZpbHRlckRvbWFpblR5cGUnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHZlcmIgPSBWZXJiSWQuR2V0UmFuZ2VEb21haW47XHJcbiAgICBsZXQgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMgPSB7fTtcclxuICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuVmlzdWFsSWRdID0ge1xyXG4gICAgICB3b3Jrc2hlZXQ6IHdvcmtzaGVldE5hbWVcclxuICAgIH07XHJcbiAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLkZpZWxkSWRdID0gZmllbGRJZDtcclxuICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuRG9tYWluVHlwZV0gPSBFeHRlcm5hbEVudW1Db252ZXJ0ZXIuZmlsdGVyRG9tYWluVHlwZS5jb252ZXJ0KGRvbWFpblR5cGUpO1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZXhlY3V0ZSh2ZXJiLCBwYXJhbWV0ZXJzKS50aGVuPENvbnRyYWN0LlJhbmdlRG9tYWluPihyZXNwb25zZSA9PiB7XHJcbiAgICAgIGxldCBkb21haW4gPSByZXNwb25zZS5yZXN1bHQgYXMgSW50ZXJuYWxDb250cmFjdC5SYW5nZURvbWFpbjtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLmNvbnZlcnRSYW5nZURvbWFpbihkb21haW4sIGRvbWFpblR5cGUpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBIZWxwZXIgTWV0aG9kc1xyXG4gIHByaXZhdGUgY29udmVydERvbWFpbkZpbHRlcnMoZG9tYWluRmlsdGVyczogSW50ZXJuYWxDb250cmFjdC5GaWx0ZXJbXSk6IENvbnRyYWN0LkZpbHRlcltdIHtcclxuICAgIGxldCBmaWx0ZXJzOiBDb250cmFjdC5GaWx0ZXJbXSA9IFtdO1xyXG4gICAgZG9tYWluRmlsdGVycy5mb3JFYWNoKGRvbWFpbkZpbHRlciA9PiB7XHJcbiAgICAgIHN3aXRjaCAoZG9tYWluRmlsdGVyLmZpbHRlclR5cGUpIHtcclxuICAgICAgICBjYXNlIEZpbHRlclR5cGUuQ2F0ZWdvcmljYWw6IHtcclxuICAgICAgICAgIGxldCBmaWx0ZXIgPSBkb21haW5GaWx0ZXIgYXMgSW50ZXJuYWxDb250cmFjdC5DYXRlZ29yaWNhbEZpbHRlcjtcclxuICAgICAgICAgIGlmIChmaWx0ZXIpIHtcclxuICAgICAgICAgICAgZmlsdGVycy5wdXNoKHRoaXMuY29udmVydENhdGVnb3JpY2FsRmlsdGVyKGZpbHRlcikpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIENhdGVnb3JpY2FsIEZpbHRlcicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIEZpbHRlclR5cGUuUmFuZ2U6IHtcclxuICAgICAgICAgIGxldCBmaWx0ZXIgPSBkb21haW5GaWx0ZXIgYXMgSW50ZXJuYWxDb250cmFjdC5SYW5nZUZpbHRlcjtcclxuICAgICAgICAgIGlmIChmaWx0ZXIpIHtcclxuICAgICAgICAgICAgZmlsdGVycy5wdXNoKHRoaXMuY29udmVydFJhbmdlRmlsdGVyKGZpbHRlcikpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFJhbmdlIEZpbHRlcicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYXNlIEZpbHRlclR5cGUuUmVsYXRpdmVEYXRlOiB7XHJcbiAgICAgICAgICBsZXQgZmlsdGVyID0gZG9tYWluRmlsdGVyIGFzIEludGVybmFsQ29udHJhY3QuUmVsYXRpdmVEYXRlRmlsdGVyO1xyXG4gICAgICAgICAgaWYgKGZpbHRlcikge1xyXG4gICAgICAgICAgICBmaWx0ZXJzLnB1c2godGhpcy5jb252ZXJ0UmVsYXRpdmVEYXRlRmlsdGVyKGZpbHRlcikpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFJlbGF0aXZlIERhdGUgRmlsdGVyJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZmlsdGVycztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29udmVydENhdGVnb3JpY2FsRmlsdGVyKGRvbWFpbkZpbHRlcjogSW50ZXJuYWxDb250cmFjdC5DYXRlZ29yaWNhbEZpbHRlcik6IENvbnRyYWN0LkNhdGVnb3JpY2FsRmlsdGVyIHtcclxuICAgIGxldCBhcHBsaWVkVmFsdWVzOiBDb250cmFjdC5EYXRhVmFsdWVbXSA9IGRvbWFpbkZpbHRlci52YWx1ZXMubWFwKGR2ID0+IHtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRhVmFsdWUoZHYudmFsdWUsIGR2LmZvcm1hdHRlZFZhbHVlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBuZXcgQ2F0ZWdvcmljYWxGaWx0ZXIoXHJcbiAgICAgIGRvbWFpbkZpbHRlci52aXN1YWxJZC53b3Jrc2hlZXQsXHJcbiAgICAgIGRvbWFpbkZpbHRlci5maWVsZENhcHRpb24sXHJcbiAgICAgIGRvbWFpbkZpbHRlci5maWVsZE5hbWUsXHJcbiAgICAgIENvbnRyYWN0LkZpbHRlclR5cGUuQ2F0ZWdvcmljYWwsXHJcbiAgICAgIGFwcGxpZWRWYWx1ZXMsXHJcbiAgICAgIGRvbWFpbkZpbHRlci5pc0V4Y2x1ZGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjb252ZXJ0UmFuZ2VGaWx0ZXIoZG9tYWluRmlsdGVyOiBJbnRlcm5hbENvbnRyYWN0LlJhbmdlRmlsdGVyKTogQ29udHJhY3QuUmFuZ2VGaWx0ZXIge1xyXG4gICAgbGV0IG1pblZhbHVlOiBEYXRhVmFsdWUgPSBuZXcgRGF0YVZhbHVlKGRvbWFpbkZpbHRlci5taW4udmFsdWUsIGRvbWFpbkZpbHRlci5taW4uZm9ybWF0dGVkVmFsdWUpO1xyXG4gICAgbGV0IG1heFZhbHVlOiBEYXRhVmFsdWUgPSBuZXcgRGF0YVZhbHVlKGRvbWFpbkZpbHRlci5tYXgudmFsdWUsIGRvbWFpbkZpbHRlci5tYXguZm9ybWF0dGVkVmFsdWUpO1xyXG4gICAgcmV0dXJuIG5ldyBSYW5nZUZpbHRlcihcclxuICAgICAgZG9tYWluRmlsdGVyLnZpc3VhbElkLndvcmtzaGVldCxcclxuICAgICAgZG9tYWluRmlsdGVyLmZpZWxkQ2FwdGlvbixcclxuICAgICAgZG9tYWluRmlsdGVyLmZpZWxkTmFtZSxcclxuICAgICAgQ29udHJhY3QuRmlsdGVyVHlwZS5SYW5nZSxcclxuICAgICAgbWluVmFsdWUsXHJcbiAgICAgIG1heFZhbHVlLFxyXG4gICAgICBkb21haW5GaWx0ZXIuaW5jbHVkZU51bGxWYWx1ZXNcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNvbnZlcnRSZWxhdGl2ZURhdGVGaWx0ZXIoZG9tYWluRmlsdGVyOiBJbnRlcm5hbENvbnRyYWN0LlJlbGF0aXZlRGF0ZUZpbHRlcik6IENvbnRyYWN0LlJlbGF0aXZlRGF0ZUZpbHRlciB7XHJcbiAgICBsZXQgYW5jaG9yRGF0ZVZhbHVlOiBEYXRhVmFsdWUgPSBuZXcgRGF0YVZhbHVlKGRvbWFpbkZpbHRlci5hbmNob3JEYXRlLnZhbHVlLCBkb21haW5GaWx0ZXIuYW5jaG9yRGF0ZS5mb3JtYXR0ZWRWYWx1ZSk7XHJcbiAgICByZXR1cm4gbmV3IFJlbGF0aXZlRGF0ZUZpbHRlciAoXHJcbiAgICAgIGRvbWFpbkZpbHRlci52aXN1YWxJZC53b3Jrc2hlZXQsXHJcbiAgICAgIGRvbWFpbkZpbHRlci5maWVsZENhcHRpb24sXHJcbiAgICAgIGRvbWFpbkZpbHRlci5maWVsZE5hbWUsXHJcbiAgICAgIENvbnRyYWN0LkZpbHRlclR5cGUuUmVsYXRpdmVEYXRlLFxyXG4gICAgICBhbmNob3JEYXRlVmFsdWUsXHJcbiAgICAgIEludGVybmFsRW51bUNvbnZlcnRlci5kYXRlU3RlcFBlcmlvZC5jb252ZXJ0KGRvbWFpbkZpbHRlci5wZXJpb2RUeXBlKSxcclxuICAgICAgSW50ZXJuYWxFbnVtQ29udmVydGVyLmRhdGVSYW5nZVR5cGUuY29udmVydChkb21haW5GaWx0ZXIucmFuZ2VUeXBlKSxcclxuICAgICAgZG9tYWluRmlsdGVyLnJhbmdlTlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29udmVydENhdGVnb3JpY2FsRG9tYWluKFxyXG4gICAgZG9tYWluOiBJbnRlcm5hbENvbnRyYWN0LkNhdGVnb3JpY2FsRG9tYWluLFxyXG4gICAgZG9tYWluVHlwZTogQ29udHJhY3QuRmlsdGVyRG9tYWluVHlwZSk6IENvbnRyYWN0LkNhdGVnb3JpY2FsRG9tYWluIHtcclxuICAgIGxldCB2YWx1ZXM6IERhdGFWYWx1ZVtdID0gZG9tYWluLnZhbHVlcy5tYXAoKGRvbWFpbkR2KSA9PiB7XHJcbiAgICAgIHJldHVybiBuZXcgRGF0YVZhbHVlKGRvbWFpbkR2LnZhbHVlLCBkb21haW5Edi5mb3JtYXR0ZWRWYWx1ZSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBuZXcgQ2F0ZWdvcmljYWxEb21haW4odmFsdWVzLCBkb21haW5UeXBlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY29udmVydFJhbmdlRG9tYWluKGRvbWFpbjogSW50ZXJuYWxDb250cmFjdC5SYW5nZURvbWFpbiwgZG9tYWluVHlwZTogQ29udHJhY3QuRmlsdGVyRG9tYWluVHlwZSk6IENvbnRyYWN0LlJhbmdlRG9tYWluIHtcclxuICAgIGxldCBtaW46IERhdGFWYWx1ZSA9IG5ldyBEYXRhVmFsdWUoZG9tYWluLm1pbi52YWx1ZSwgZG9tYWluLm1pbi5mb3JtYXR0ZWRWYWx1ZSk7XHJcbiAgICBsZXQgbWF4OiBEYXRhVmFsdWUgPSBuZXcgRGF0YVZhbHVlKGRvbWFpbi5tYXgudmFsdWUsIGRvbWFpbi5tYXguZm9ybWF0dGVkVmFsdWUpO1xyXG4gICAgcmV0dXJuIG5ldyBSYW5nZURvbWFpbihcclxuICAgICAgbWluLFxyXG4gICAgICBtYXgsXHJcbiAgICAgIGRvbWFpblR5cGVcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvU2VydmljZXMvaW1wbC9GaWx0ZXJTZXJ2aWNlSW1wbC50c1xuICoqLyIsImltcG9ydCB7XHJcbiAgRmlsdGVyRG9tYWluVHlwZSBhcyBFeHRlcm5hbERvbWFpblR5cGUsXHJcbiAgRmlsdGVyTnVsbE9wdGlvbiBhcyBFeHRlcm5hbE51bGxPcHRpb25cclxufSBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQge1xyXG4gIEZpbHRlckRvbWFpblR5cGUgYXMgSW50ZXJuYWxEb21haW5UeXBlLFxyXG4gIEZpbHRlck51bGxPcHRpb24gYXMgSW50ZXJuYWxOdWxsT3B0aW9uXHJcbn0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IEVudW1Db252ZXJ0ZXIgfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuLyogdHNsaW50OmRpc2FibGU6dHlwZWRlZiAtIERpc2FibGUgdGhpcyB0byBtYWtlIGRlY2xhcmluZyB0aGVzZSBjbGFzc2VzIGEgYml0IGVhc2llciAqL1xyXG4vKipcclxuICogTWFwcyBlbnVtcyB1c2VkIGJ5IHRoZSBleHRlcm5hbC1hcGktY29udHJhY3QgdG8gdGhlIGVudW1zIHVzZWRcclxuICogaW4gdGhlIGludGVybmFsLWFwaS1jb250cmFjdCwgd2hpY2ggZGV2ZWxvcGVycyBjb2RlIGFnYWluc3QuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRXh0ZXJuYWxUb0ludGVybmFsRW51bU1hcHBpbmdzIHtcclxuICBwdWJsaWMgc3RhdGljIG51bGxPcHRpb25zID0gbmV3IEVudW1Db252ZXJ0ZXI8RXh0ZXJuYWxOdWxsT3B0aW9uLCBJbnRlcm5hbE51bGxPcHRpb24+KHtcclxuICAgIFtFeHRlcm5hbE51bGxPcHRpb24uQWxsVmFsdWVzXTogSW50ZXJuYWxOdWxsT3B0aW9uLkFsbFZhbHVlcyxcclxuICAgIFtFeHRlcm5hbE51bGxPcHRpb24uTm9uTnVsbFZhbHVlc106IEludGVybmFsTnVsbE9wdGlvbi5Ob25OdWxsVmFsdWVzLFxyXG4gICAgW0V4dGVybmFsTnVsbE9wdGlvbi5Ob25OdWxsVmFsdWVzXTogSW50ZXJuYWxOdWxsT3B0aW9uLk51bGxWYWx1ZXNcclxuICB9KTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBmaWx0ZXJEb21haW5UeXBlID0gbmV3IEVudW1Db252ZXJ0ZXI8RXh0ZXJuYWxEb21haW5UeXBlLCBJbnRlcm5hbERvbWFpblR5cGU+KHtcclxuICAgIFtFeHRlcm5hbERvbWFpblR5cGUuUmVsZXZhbnRdOiBJbnRlcm5hbERvbWFpblR5cGUuUmVsZXZhbnQsXHJcbiAgICBbRXh0ZXJuYWxEb21haW5UeXBlLkRhdGFiYXNlXTogSW50ZXJuYWxEb21haW5UeXBlLkRhdGFiYXNlXHJcbiAgfSk7XHJcbn1cclxuLyogdHNsaW50OmVuYWJsZTp0eXBlZGVmICovXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRW51bU1hcHBpbmdzL0V4dGVybmFsVG9JbnRlcm5hbEVudW1NYXBwaW5ncy50c1xuICoqLyIsImltcG9ydCB7XHJcbiAgQ29sdW1uVHlwZSBhcyBFeHRlcm5hbENvbHVtblR5cGUsXHJcbiAgRGFzaGJvYXJkT2JqZWN0VHlwZSBhcyBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUsXHJcbiAgRGF0YVR5cGUgYXMgRXh0ZXJuYWxEYXRhVHlwZSxcclxuICBEYXRlUmFuZ2VUeXBlIGFzIEV4dGVybmFsRGF0ZVJhbmdlVHlwZSxcclxuICBFeHRlbnNpb25Db250ZXh0IGFzIEV4dGVybmFsRXh0ZW5zaW9uc0NvbnRleHQsXHJcbiAgRXh0ZW5zaW9uTW9kZSBhcyBFeHRlcm5hbEV4dGVuc2lvbnNNb2RlLFxyXG4gIEZpZWxkQWdncmVnYXRpb25UeXBlIGFzIEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUsXHJcbiAgRmllbGRSb2xlVHlwZSBhcyBFeHRlcm5hbEZpZWxkUm9sZVR5cGUsXHJcbiAgRmlsdGVyVHlwZSBhcyBFeHRlcm5hbEZpbHRlclR5cGUsXHJcbiAgRmlsdGVyVXBkYXRlVHlwZSBhcyBFeHRlcm5hbEZpbHRlclVwZGF0ZVR5cGUsXHJcbiAgUGFyYW1ldGVyVmFsdWVUeXBlIGFzIEV4dGVybmFsUGFyYW1ldGVyVmFsdWVUeXBlLFxyXG4gIFBlcmlvZFR5cGUgYXMgRXh0ZXJuYWxEYXRlUGVyaW9kLFxyXG4gIFNoZWV0VHlwZSBhcyBFeHRlcm5hbFNoZWV0VHlwZSxcclxufSBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHtcclxuICBDb2x1bW5UeXBlIGFzIEludGVybmFsQ29sdW1uVHlwZSxcclxuICBEYXNoYm9hcmRPYmplY3RUeXBlIGFzIEludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZSxcclxuICBEYXRhVHlwZSBhcyBJbnRlcm5hbERhdGFUeXBlLFxyXG4gIERhdGVSYW5nZVR5cGUgYXMgSW50ZXJuYWxEYXRlUmFuZ2VUeXBlLFxyXG4gIERhdGVTdGVwUGVyaW9kIGFzIEludGVybmFsRGF0ZVN0ZXBQZXJpb2QsXHJcbiAgRG9tYWluUmVzdHJpY3Rpb25UeXBlIGFzIEludGVybmFsRG9tYWluUmVzdHJpY3Rpb25UeXBlLFxyXG4gIEV4dGVuc2lvbkNvbnRleHQgYXMgSW50ZXJuYWxFeHRlbnNpb25zQ29udGV4dCxcclxuICBFeHRlbnNpb25Nb2RlIGFzIEludGVybmFsRXh0ZW5zaW9uc01vZGUsXHJcbiAgRmllbGRBZ2dyZWdhdGlvblR5cGUgYXMgSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZSxcclxuICBGaWVsZFJvbGVUeXBlIGFzIEludGVybmFsRmllbGRSb2xlVHlwZSxcclxuICBGaWx0ZXJUeXBlIGFzIEludGVybmFsRmlsdGVyVHlwZSxcclxuICBGaWx0ZXJVcGRhdGVUeXBlIGFzIEludGVybmFsRmlsdGVyVXBkYXRlVHlwZSxcclxuICBTaGVldFR5cGUgYXMgSW50ZXJuYWxTaGVldFR5cGUsXHJcbn0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IEVudW1Db252ZXJ0ZXIgfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuLyogdHNsaW50OmRpc2FibGU6dHlwZWRlZiAtIERpc2FibGUgdGhpcyB0byBtYWtlIGRlY2xhcmluZyB0aGVzZSBjbGFzc2VzIGEgYml0IGVhc2llciAqL1xyXG4vKipcclxuICogTWFwcyBlbnVtcyB1c2VkIGJ5IHRoZSBpbnRlcm5hbC1hcGktY29udHJhY3QgdG8gdGhlIGVudW1zIHVzZWRcclxuICogaW4gdGhlIGV4dGVybmFsLWFwaS1jb250cmFjdCwgd2hpY2ggZGV2ZWxvcGVycyBjb2RlIGFnYWluc3QuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzIHtcclxuICBwdWJsaWMgc3RhdGljIGV4dGVuc2lvbkNvbnRleHQgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbEV4dGVuc2lvbnNDb250ZXh0LCBFeHRlcm5hbEV4dGVuc2lvbnNDb250ZXh0Pih7XHJcbiAgICBbSW50ZXJuYWxFeHRlbnNpb25zQ29udGV4dC5EZXNrdG9wXTogRXh0ZXJuYWxFeHRlbnNpb25zQ29udGV4dC5EZXNrdG9wLFxyXG4gICAgW0ludGVybmFsRXh0ZW5zaW9uc0NvbnRleHQuU2VydmVyXTogRXh0ZXJuYWxFeHRlbnNpb25zQ29udGV4dC5TZXJ2ZXJcclxuICB9KTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBleHRlbnNpb25Nb2RlID0gbmV3IEVudW1Db252ZXJ0ZXI8SW50ZXJuYWxFeHRlbnNpb25zTW9kZSwgRXh0ZXJuYWxFeHRlbnNpb25zTW9kZT4oe1xyXG4gICAgW0ludGVybmFsRXh0ZW5zaW9uc01vZGUuQXV0aG9yaW5nXTogRXh0ZXJuYWxFeHRlbnNpb25zTW9kZS5BdXRob3JpbmcsXHJcbiAgICBbSW50ZXJuYWxFeHRlbnNpb25zTW9kZS5WaWV3aW5nXTogRXh0ZXJuYWxFeHRlbnNpb25zTW9kZS5WaWV3aW5nXHJcbiAgfSk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgY29sdW1uVHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsQ29sdW1uVHlwZSwgRXh0ZXJuYWxDb2x1bW5UeXBlPih7XHJcbiAgICBbSW50ZXJuYWxDb2x1bW5UeXBlLkNvbnRpbnVvdXNdOiBFeHRlcm5hbENvbHVtblR5cGUuQ29udGludW91cyxcclxuICAgIFtJbnRlcm5hbENvbHVtblR5cGUuRGlzY3JldGVdOiBFeHRlcm5hbENvbHVtblR5cGUuRGlzY3JldGVcclxuICB9KTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBmaWVsZEFnZ3JlZ2F0aW9uVHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUsIEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGU+KHtcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkF0dHJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkF0dHIsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5BdmddOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkF2ZyxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkNvdW50XTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Db3VudCxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkNvdW50ZF06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuQ291bnRkLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuRGF5XTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5EYXksXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5FbmRdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkVuZCxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkhvdXJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLkhvdXIsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Jbk91dF06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuSW5PdXQsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5LdXJ0b3Npc106IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuS3VydG9zaXMsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5NYXhdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLk1heCxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLk1keV06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTWR5LFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTWVkaWFuXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5NZWRpYW4sXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5NaW5dOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLk1pbixcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLk1pbnV0ZV06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTWludXRlLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuTW9udGhZZWFyXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Nb250aFllYXIsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Ob25lXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Ob25lLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuUXRyXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5RdHIsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5RdWFydDFdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlF1YXJ0MSxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlF1YXJ0M106IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuUXVhcnQzLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuU2Vjb25kXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5TZWNvbmQsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5Ta2V3bmVzc106IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuU2tld25lc3MsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5TdGRldl06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuU3RkZXYsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5TdGRldnBdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlN0ZGV2cCxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlN1bV06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuU3VtLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNEYXldOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlRydW5jRGF5LFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNIb3VyXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY0hvdXIsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY01pbnV0ZV06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNNaW51dGUsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY01vbnRoXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY01vbnRoLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNRdHJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlRydW5jUXRyLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNTZWNvbmRdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlRydW5jU2Vjb25kLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuVHJ1bmNXZWVrXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY1dlZWssXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5UcnVuY1llYXJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlRydW5jWWVhcixcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlVzZXJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlVzZXIsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5WYXJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlZhcixcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlZhcnBdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlZhcnAsXHJcbiAgICBbSW50ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5XZWVrXTogRXh0ZXJuYWxGaWVsZEFnZ3JlZ2F0aW9uVHlwZS5XZWVrLFxyXG4gICAgW0ludGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuV2Vla2RheV06IEV4dGVybmFsRmllbGRBZ2dyZWdhdGlvblR5cGUuV2Vla2RheSxcclxuICAgIFtJbnRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlllYXJdOiBFeHRlcm5hbEZpZWxkQWdncmVnYXRpb25UeXBlLlllYXIsXHJcbiAgfSk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZmllbGRSb2xlVHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsRmllbGRSb2xlVHlwZSwgRXh0ZXJuYWxGaWVsZFJvbGVUeXBlPih7XHJcbiAgICBbSW50ZXJuYWxGaWVsZFJvbGVUeXBlLkRpbWVuc2lvbl06IEV4dGVybmFsRmllbGRSb2xlVHlwZS5EaW1lbnNpb24sXHJcbiAgICBbSW50ZXJuYWxGaWVsZFJvbGVUeXBlLk1lYXN1cmVdOiBFeHRlcm5hbEZpZWxkUm9sZVR5cGUuTWVhc3VyZSxcclxuICAgIFtJbnRlcm5hbEZpZWxkUm9sZVR5cGUuVW5rbm93bl06IEV4dGVybmFsRmllbGRSb2xlVHlwZS5Vbmtub3duLFxyXG4gIH0pO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIHNoZWV0VHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsU2hlZXRUeXBlLCBFeHRlcm5hbFNoZWV0VHlwZT4oe1xyXG4gICAgW0ludGVybmFsU2hlZXRUeXBlLkRhc2hib2FyZF06IEV4dGVybmFsU2hlZXRUeXBlLkRhc2hib2FyZCxcclxuICAgIFtJbnRlcm5hbFNoZWV0VHlwZS5TdG9yeV06IEV4dGVybmFsU2hlZXRUeXBlLlN0b3J5LFxyXG4gICAgW0ludGVybmFsU2hlZXRUeXBlLldvcmtzaGVldF06IEV4dGVybmFsU2hlZXRUeXBlLldvcmtzaGVldFxyXG4gIH0pO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGRhc2hib2FyZE9iamVjdFR5cGUgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUsIEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZT4oe1xyXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5FeHRlbnNpb25dOiBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuRXh0ZW5zaW9uLFxyXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5CbGFua106IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5CbGFuayxcclxuICAgIFtJbnRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuSW1hZ2VdOiBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuSW1hZ2UsXHJcbiAgICBbSW50ZXJuYWxEYXNoYm9hcmRPYmplY3RUeXBlLkxlZ2VuZF06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5MZWdlbmQsXHJcbiAgICBbSW50ZXJuYWxEYXNoYm9hcmRPYmplY3RUeXBlLlBhZ2VGaWx0ZXJdOiBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuUGFnZUZpbHRlcixcclxuICAgIFtJbnRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuUGFyYW1ldGVyQ29udHJvbF06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5QYXJhbWV0ZXJDb250cm9sLFxyXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5RdWlja0ZpbHRlcl06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5RdWlja0ZpbHRlcixcclxuICAgIFtJbnRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuVGV4dF06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5UZXh0LFxyXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5UaXRsZV06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5UaXRsZSxcclxuICAgIFtJbnRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuV2ViUGFnZV06IEV4dGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5XZWJQYWdlLFxyXG4gICAgW0ludGVybmFsRGFzaGJvYXJkT2JqZWN0VHlwZS5Xb3Jrc2hlZXRdOiBFeHRlcm5hbERhc2hib2FyZE9iamVjdFR5cGUuV29ya3NoZWV0XHJcbiAgfSk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZGF0YVR5cGUgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbERhdGFUeXBlLCBFeHRlcm5hbERhdGFUeXBlPih7XHJcbiAgICBbSW50ZXJuYWxEYXRhVHlwZS5Cb29sXTogRXh0ZXJuYWxEYXRhVHlwZS5Cb29sLFxyXG4gICAgW0ludGVybmFsRGF0YVR5cGUuRGF0ZV06IEV4dGVybmFsRGF0YVR5cGUuRGF0ZSxcclxuICAgIFtJbnRlcm5hbERhdGFUeXBlLkRhdGVUaW1lXTogRXh0ZXJuYWxEYXRhVHlwZS5EYXRlVGltZSxcclxuICAgIFtJbnRlcm5hbERhdGFUeXBlLkZsb2F0XTogRXh0ZXJuYWxEYXRhVHlwZS5GbG9hdCxcclxuICAgIFtJbnRlcm5hbERhdGFUeXBlLkludF06IEV4dGVybmFsRGF0YVR5cGUuSW50LFxyXG4gICAgW0ludGVybmFsRGF0YVR5cGUuU3RyaW5nXTogRXh0ZXJuYWxEYXRhVHlwZS5TdHJpbmdcclxuICB9KTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBmaWx0ZXJVcGRhdGVUeXBlID0gbmV3IEVudW1Db252ZXJ0ZXI8SW50ZXJuYWxGaWx0ZXJVcGRhdGVUeXBlLCBFeHRlcm5hbEZpbHRlclVwZGF0ZVR5cGU+KHtcclxuICAgIFtJbnRlcm5hbEZpbHRlclVwZGF0ZVR5cGUuQWRkXTogRXh0ZXJuYWxGaWx0ZXJVcGRhdGVUeXBlLkFkZCxcclxuICAgIFtJbnRlcm5hbEZpbHRlclVwZGF0ZVR5cGUuQWxsXTogRXh0ZXJuYWxGaWx0ZXJVcGRhdGVUeXBlLkFsbCxcclxuICAgIFtJbnRlcm5hbEZpbHRlclVwZGF0ZVR5cGUuUmVtb3ZlXTogRXh0ZXJuYWxGaWx0ZXJVcGRhdGVUeXBlLlJlbW92ZSxcclxuICAgIFtJbnRlcm5hbEZpbHRlclVwZGF0ZVR5cGUuUmVwbGFjZV06IEV4dGVybmFsRmlsdGVyVXBkYXRlVHlwZS5SZXBsYWNlXHJcbiAgfSk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYWxsb3dhYmxlVmFsdWVzID0gbmV3IEVudW1Db252ZXJ0ZXI8SW50ZXJuYWxEb21haW5SZXN0cmljdGlvblR5cGUsIEV4dGVybmFsUGFyYW1ldGVyVmFsdWVUeXBlPih7XHJcbiAgICBbSW50ZXJuYWxEb21haW5SZXN0cmljdGlvblR5cGUuQWxsXTogRXh0ZXJuYWxQYXJhbWV0ZXJWYWx1ZVR5cGUuQWxsLFxyXG4gICAgW0ludGVybmFsRG9tYWluUmVzdHJpY3Rpb25UeXBlLkxpc3RdOiBFeHRlcm5hbFBhcmFtZXRlclZhbHVlVHlwZS5MaXN0LFxyXG4gICAgW0ludGVybmFsRG9tYWluUmVzdHJpY3Rpb25UeXBlLlJhbmdlXTogRXh0ZXJuYWxQYXJhbWV0ZXJWYWx1ZVR5cGUuUmFuZ2VcclxuICB9KTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBkYXRlU3RlcFBlcmlvZCA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsRGF0ZVN0ZXBQZXJpb2QsIEV4dGVybmFsRGF0ZVBlcmlvZD4oe1xyXG4gICAgW0ludGVybmFsRGF0ZVN0ZXBQZXJpb2QuWWVhcnNdOiBFeHRlcm5hbERhdGVQZXJpb2QuWWVhcnMsXHJcbiAgICBbSW50ZXJuYWxEYXRlU3RlcFBlcmlvZC5RdWFydGVyc106IEV4dGVybmFsRGF0ZVBlcmlvZC5RdWFydGVycyxcclxuICAgIFtJbnRlcm5hbERhdGVTdGVwUGVyaW9kLk1vbnRoc106IEV4dGVybmFsRGF0ZVBlcmlvZC5Nb250aHMsXHJcbiAgICBbSW50ZXJuYWxEYXRlU3RlcFBlcmlvZC5XZWVrc106IEV4dGVybmFsRGF0ZVBlcmlvZC5XZWVrcyxcclxuICAgIFtJbnRlcm5hbERhdGVTdGVwUGVyaW9kLkRheXNdOiBFeHRlcm5hbERhdGVQZXJpb2QuRGF5cyxcclxuICAgIFtJbnRlcm5hbERhdGVTdGVwUGVyaW9kLkhvdXJzXTogRXh0ZXJuYWxEYXRlUGVyaW9kLkhvdXJzLFxyXG4gICAgW0ludGVybmFsRGF0ZVN0ZXBQZXJpb2QuTWludXRlc106IEV4dGVybmFsRGF0ZVBlcmlvZC5NaW51dGVzLFxyXG4gICAgW0ludGVybmFsRGF0ZVN0ZXBQZXJpb2QuU2Vjb25kc106IEV4dGVybmFsRGF0ZVBlcmlvZC5TZWNvbmRzXHJcbiAgfSk7XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZGF0ZVJhbmdlVHlwZSA9IG5ldyBFbnVtQ29udmVydGVyPEludGVybmFsRGF0ZVJhbmdlVHlwZSwgRXh0ZXJuYWxEYXRlUmFuZ2VUeXBlPih7XHJcbiAgICBbSW50ZXJuYWxEYXRlUmFuZ2VUeXBlLkN1cnJlbnRdOiBFeHRlcm5hbERhdGVSYW5nZVR5cGUuQ3VycmVudCxcclxuICAgIFtJbnRlcm5hbERhdGVSYW5nZVR5cGUuTGFzdF06IEV4dGVybmFsRGF0ZVJhbmdlVHlwZS5MYXN0LFxyXG4gICAgW0ludGVybmFsRGF0ZVJhbmdlVHlwZS5MYXN0Tl06IEV4dGVybmFsRGF0ZVJhbmdlVHlwZS5MYXN0TixcclxuICAgIFtJbnRlcm5hbERhdGVSYW5nZVR5cGUuTmV4dF06IEV4dGVybmFsRGF0ZVJhbmdlVHlwZS5OZXh0LFxyXG4gICAgW0ludGVybmFsRGF0ZVJhbmdlVHlwZS5OZXh0Tl06IEV4dGVybmFsRGF0ZVJhbmdlVHlwZS5OZXh0TixcclxuICAgIFtJbnRlcm5hbERhdGVSYW5nZVR5cGUuVG9EYXRlXTogRXh0ZXJuYWxEYXRlUmFuZ2VUeXBlLlRvRGF0ZVxyXG4gIH0pO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGZpbHRlclR5cGUgPSBuZXcgRW51bUNvbnZlcnRlcjxJbnRlcm5hbEZpbHRlclR5cGUsIEV4dGVybmFsRmlsdGVyVHlwZT4oe1xyXG4gICAgW0ludGVybmFsRmlsdGVyVHlwZS5DYXRlZ29yaWNhbF06IEV4dGVybmFsRmlsdGVyVHlwZS5DYXRlZ29yaWNhbCxcclxuICAgIFtJbnRlcm5hbEZpbHRlclR5cGUuUmFuZ2VdIDogRXh0ZXJuYWxGaWx0ZXJUeXBlLlJhbmdlLFxyXG4gICAgW0ludGVybmFsRmlsdGVyVHlwZS5SZWxhdGl2ZURhdGVdOiBFeHRlcm5hbEZpbHRlclR5cGUuUmVsYXRpdmVEYXRlLFxyXG4gICAgW0ludGVybmFsRmlsdGVyVHlwZS5IaWVyYXJjaGljYWxdOiBFeHRlcm5hbEZpbHRlclR5cGUuSGllcmFyY2hpY2FsXHJcbiAgfSk7XHJcbn1cclxuLyogdHNsaW50OmVuYWJsZTp0eXBlZGVmICovXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRW51bU1hcHBpbmdzL0ludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncy50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5pbXBvcnQgeyBGaWx0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vU2VydmljZXMvRmlsdGVyU2VydmljZSc7XHJcbmltcG9ydCB7IEFwaVNlcnZpY2VSZWdpc3RyeSwgU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vU2VydmljZXMvU2VydmljZVJlZ2lzdHJ5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWx0ZXIgaW1wbGVtZW50cyBDb250cmFjdC5GaWx0ZXIge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIHByb3RlY3RlZCBfd29ya3NoZWV0TmFtZTogc3RyaW5nLFxyXG4gICAgcHJvdGVjdGVkIF9maWVsZE5hbWU6IHN0cmluZyxcclxuICAgIHByb3RlY3RlZCBfZmlsdGVyVHlwZTogQ29udHJhY3QuRmlsdGVyVHlwZSxcclxuICAgIHByb3RlY3RlZCBfZmllbGRJZDogc3RyaW5nKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHdvcmtzaGVldE5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl93b3Jrc2hlZXROYW1lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBmaWVsZE5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZE5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGZpZWxkSWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZElkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBmaWx0ZXJUeXBlKCk6IENvbnRyYWN0LkZpbHRlclR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlclR5cGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RmllbGRBc3luYygpOiBQcm9taXNlPENvbnRyYWN0LkZpZWxkPiB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQnKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYXRlZ29yaWNhbEZpbHRlciBleHRlbmRzIEZpbHRlciBpbXBsZW1lbnRzIENvbnRyYWN0LkNhdGVnb3JpY2FsRmlsdGVyIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICB3b3Jrc2hlZXROYW1lOiBzdHJpbmcsXHJcbiAgICBmaWVsZE5hbWU6IHN0cmluZyxcclxuICAgIGZpZWxkSWQ6IHN0cmluZyxcclxuICAgIGZpbHRlclR5cGU6IENvbnRyYWN0LkZpbHRlclR5cGUsXHJcbiAgICBwcml2YXRlIF9hcHBsaWVkVmFsdWVzOiBDb250cmFjdC5EYXRhVmFsdWVbXSxcclxuICAgIHByaXZhdGUgX2lzRXhjbHVkZU1vZGU6IGJvb2xlYW4pIHtcclxuICAgICAgc3VwZXIod29ya3NoZWV0TmFtZSwgZmllbGROYW1lLCBmaWx0ZXJUeXBlLCBmaWVsZElkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgYXBwbGllZFZhbHVlcygpOiBDb250cmFjdC5EYXRhVmFsdWVbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYXBwbGllZFZhbHVlcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaXNFeGNsdWRlTW9kZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc0V4Y2x1ZGVNb2RlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERvbWFpbkFzeW5jKGRvbWFpblR5cGU/OiBDb250cmFjdC5GaWx0ZXJEb21haW5UeXBlKTogUHJvbWlzZTxDb250cmFjdC5DYXRlZ29yaWNhbERvbWFpbj4ge1xyXG4gICAgaWYgKCFkb21haW5UeXBlKSB7XHJcbiAgICAgIGRvbWFpblR5cGUgPSBDb250cmFjdC5GaWx0ZXJEb21haW5UeXBlLlJlbGV2YW50O1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPEZpbHRlclNlcnZpY2U+KFNlcnZpY2VOYW1lcy5GaWx0ZXIpO1xyXG4gICAgcmV0dXJuIHNlcnZpY2UuZ2V0Q2F0ZWdvcmljYWxEb21haW5Bc3luYyh0aGlzLl93b3Jrc2hlZXROYW1lLCB0aGlzLl9maWVsZElkLCBkb21haW5UeXBlKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSYW5nZUZpbHRlciBleHRlbmRzIEZpbHRlciBpbXBsZW1lbnRzIENvbnRyYWN0LlJhbmdlRmlsdGVyIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICB3b3Jrc2hlZXROYW1lOiBzdHJpbmcsXHJcbiAgICBmaWVsZE5hbWU6IHN0cmluZyxcclxuICAgIGZpZWxkSWQ6IHN0cmluZyxcclxuICAgIGZpbHRlclR5cGU6IENvbnRyYWN0LkZpbHRlclR5cGUsXHJcbiAgICBwcml2YXRlIF9taW46IENvbnRyYWN0LkRhdGFWYWx1ZSxcclxuICAgIHByaXZhdGUgX21heDogQ29udHJhY3QuRGF0YVZhbHVlLFxyXG4gICAgcHJpdmF0ZSBfaW5jbHVkZU51bGxWYWx1ZXM6IGJvb2xlYW4pIHtcclxuICAgICAgc3VwZXIod29ya3NoZWV0TmFtZSwgZmllbGROYW1lLCBmaWx0ZXJUeXBlLCBmaWVsZElkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbWluVmFsdWUoKTogQ29udHJhY3QuRGF0YVZhbHVlIHtcclxuICAgIHJldHVybiB0aGlzLl9taW47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG1heFZhbHVlKCk6IENvbnRyYWN0LkRhdGFWYWx1ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWF4O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpbmNsdWRlTnVsbFZhbHVlcygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pbmNsdWRlTnVsbFZhbHVlcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyAgZ2V0RG9tYWluQXN5bmMoZG9tYWluVHlwZT86IENvbnRyYWN0LkZpbHRlckRvbWFpblR5cGUpOiBQcm9taXNlPENvbnRyYWN0LlJhbmdlRG9tYWluPiB7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8RmlsdGVyU2VydmljZT4oU2VydmljZU5hbWVzLkZpbHRlcik7XHJcbiAgICBpZiAoIWRvbWFpblR5cGUpIHtcclxuICAgICAgZG9tYWluVHlwZSA9IENvbnRyYWN0LkZpbHRlckRvbWFpblR5cGUuUmVsZXZhbnQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VydmljZS5nZXRSYW5nZURvbWFpbkFzeW5jKHRoaXMuX3dvcmtzaGVldE5hbWUsIHRoaXMuX2ZpZWxkSWQsIGRvbWFpblR5cGUpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlbGF0aXZlRGF0ZUZpbHRlciBleHRlbmRzIEZpbHRlciBpbXBsZW1lbnRzIENvbnRyYWN0LlJlbGF0aXZlRGF0ZUZpbHRlciB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgd29ya3NoZWV0TmFtZTogc3RyaW5nLFxyXG4gICAgZmllbGROYW1lOiBzdHJpbmcsXHJcbiAgICBmaWVsZElkOiBzdHJpbmcsXHJcbiAgICBmaWx0ZXJUeXBlOiBDb250cmFjdC5GaWx0ZXJUeXBlLFxyXG4gICAgcHJpdmF0ZSBfYW5jaG9yRGF0ZTogQ29udHJhY3QuRGF0YVZhbHVlLFxyXG4gICAgcHJpdmF0ZSBfcGVyaW9kVHlwZTogQ29udHJhY3QuUGVyaW9kVHlwZSxcclxuICAgIHByaXZhdGUgX3JhbmdlVHlwZTogQ29udHJhY3QuRGF0ZVJhbmdlVHlwZSxcclxuICAgIHByaXZhdGUgX3JhbmdlTjogbnVtYmVyKSB7XHJcbiAgICAgIHN1cGVyKHdvcmtzaGVldE5hbWUsIGZpZWxkTmFtZSwgZmlsdGVyVHlwZSwgZmllbGRJZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGFuY2hvckRhdGUoKTogQ29udHJhY3QuRGF0YVZhbHVlIHtcclxuICAgIHJldHVybiB0aGlzLl9hbmNob3JEYXRlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBwZXJpb2RUeXBlKCk6IENvbnRyYWN0LlBlcmlvZFR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BlcmlvZFR5cGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHJhbmdlVHlwZSgpOiBDb250cmFjdC5EYXRlUmFuZ2VUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLl9yYW5nZVR5cGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHJhbmdlTigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlTjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYXRlZ29yaWNhbERvbWFpbiBpbXBsZW1lbnRzIENvbnRyYWN0LkNhdGVnb3JpY2FsRG9tYWluIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF92YWx1ZXM6IENvbnRyYWN0LkRhdGFWYWx1ZVtdLFxyXG4gICAgcHJpdmF0ZSBfZG9tYWluVHlwZTogQ29udHJhY3QuRmlsdGVyRG9tYWluVHlwZSkge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB2YWx1ZXMoKTogQ29udHJhY3QuRGF0YVZhbHVlW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlcztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgdHlwZSgpOiBDb250cmFjdC5GaWx0ZXJEb21haW5UeXBlIHtcclxuICAgIHJldHVybiB0aGlzLl9kb21haW5UeXBlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJhbmdlRG9tYWluIGltcGxlbWVudHMgQ29udHJhY3QuUmFuZ2VEb21haW4ge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX21pbjogQ29udHJhY3QuRGF0YVZhbHVlLFxyXG4gICAgcHJpdmF0ZSBfbWF4OiBDb250cmFjdC5EYXRhVmFsdWUsXHJcbiAgICBwcml2YXRlIF9kb21haW5UeXBlOiBDb250cmFjdC5GaWx0ZXJEb21haW5UeXBlKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHR5cGUoKTogQ29udHJhY3QuRmlsdGVyRG9tYWluVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZG9tYWluVHlwZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbWluKCk6IENvbnRyYWN0LkRhdGFWYWx1ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fbWluO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBtYXgoKTogQ29udHJhY3QuRGF0YVZhbHVlIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXg7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvTW9kZWxzL0ZpbHRlck1vZGVscy50c1xuICoqLyIsImltcG9ydCB7IFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG4vKipcclxuICogQmFzZSBpbnRlcmZhY2UgZm9yIGFuIGFwaSBzZXJ2aWNlXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEFwaVNlcnZpY2Uge1xyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIG5hbWUgZm9yIHRoaXMgc2VydmljZS5cclxuICAgKi9cclxuICByZWFkb25seSBzZXJ2aWNlTmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICogQ29sbGVjdGlvbiBvZiBzZXJ2aWNlIG5hbWUgd2hpY2ggd2lsbCBiZSByZWdpc3RlcmVkIGluIHRoZSBhcGktc2hhcmVkIHByb2plY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBlbnVtIFNlcnZpY2VOYW1lcyB7XHJcbiAgRGF0YVNvdXJjZVNlcnZpY2UgPSAnZGF0YS1zb3VyY2Utc2VydmljZScsXHJcbiAgR2V0RGF0YSA9ICdnZXQtZGF0YS1zZXJ2aWNlJyxcclxuICBGaWx0ZXIgPSAnZmlsdGVyLXNlcnZpY2UnLFxyXG4gIE5vdGlmaWNhdGlvbiA9ICdub3RpZmljYXRpb24tc2VydmljZScsXHJcbiAgUGFyYW1ldGVycyA9ICdwYXJhbWV0ZXJzLXNlcnZpY2UnLFxyXG4gIFNlbGVjdGlvbiA9ICdzZWxlY3Rpb24tc2VydmljZSdcclxufVxyXG5cclxuLyoqXHJcbiAqIERvIHNvbWUgZ2xvYmFibCBkZWNsYXJhdGlvbnMgc28gd2UgY2FuIGNyZWF0ZSBhIHNpbmdsZXRvbiBvbiB0aGUgd2luZG93IG9iamVjdFxyXG4gKi9cclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gIGludGVyZmFjZSBXaW5kb3cgeyBfX3RhYmxlYXVBcGlTZXJ2aWNlUmVnaXN0cnk6IFNlcnZpY2VSZWdpc3RyeSB8IHVuZGVmaW5lZDsgfVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNlcnZpY2VSZWdpc3RyeSB7XHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXJzIGEgbmV3IHNlcnZpY2UgaW50byB0aGUgc2VydmljZSByZWdpc3RyeS4gQW55IGV4aXN0aW5nIG9uZSB3aWxsXHJcbiAgICogYmUgb3ZlcndyaXR0ZW4uIHRoZSBzZXJ2aWNlIGlzIHJlZ2lzdGVyZWQgdW5kZXIgc2VydmljZS5zZXJ2aWNlTmFtZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtBcGlTZXJ2aWNlfSBzZXJ2aWNlIFRoZSBzZXJ2aXZlIHRvIHJlZ2lzdGVyXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJTZXJ2aWNlKHNlcnZpY2U6IEFwaVNlcnZpY2UpOiB2b2lkO1xyXG5cclxuICAvKipcclxuICAgKiBSZXRyaWV2ZXMgdGhlIGdpdmVuIHNlcnZpY2UgZnJvbSB0aGUgcmVnaXN0cnkuIElmIHRoZXJlIGlzIG5vdCBhXHJcbiAgICogc2VydmljZSByZWdpc3RlcmVkIHVuZGVyIHRoYXQgbmFtZSwgdGhyb3dzIGFuZCBlcnJvclxyXG4gICAqXHJcbiAgICogQHRlbXBsYXRlIFQgVGhlIHR5cGUgb2YgdGhlIHNlcnZpY2VcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VydmljZU5hbWUgVGhlIG5hbWUgb2YgdGhlIHNlcnZpY2UuXHJcbiAgICogQHJldHVybnMge1R9IFRoZSByZXF1ZXN0ZWQgc2VydmljZVxyXG4gICAqL1xyXG4gIGdldFNlcnZpY2U8VCBleHRlbmRzIEFwaVNlcnZpY2U+KHNlcnZpY2VOYW1lOiBzdHJpbmcpOiBUO1xyXG59XHJcblxyXG5jbGFzcyBTZXJ2aWNlUmVnaXN0cnlJbXBsIGltcGxlbWVudHMgU2VydmljZVJlZ2lzdHJ5IHtcclxuICBwcml2YXRlIHN0YXRpYyBTRVJWSUNFX05PVF9SRUdJU1RFUkVEOiBzdHJpbmcgPSAnTm8gU2VydmljZSAlMSBpcyByZWdpc3RlcmVkJztcclxuICBwcml2YXRlIF9zZXJ2aWNlczogeyBbc2VydmljZU5hbWU6IHN0cmluZ106IEFwaVNlcnZpY2U7IH07XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX3NlcnZpY2VzID0ge307XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVnaXN0ZXJTZXJ2aWNlKHNlcnZpY2U6IEFwaVNlcnZpY2UpOiB2b2lkIHtcclxuICAgIHRoaXMuX3NlcnZpY2VzW3NlcnZpY2Uuc2VydmljZU5hbWVdID0gc2VydmljZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTZXJ2aWNlPFQgZXh0ZW5kcyBBcGlTZXJ2aWNlPihzZXJ2aWNlTmFtZTogc3RyaW5nKTogVCB7XHJcbiAgICBpZiAoIXRoaXMuX3NlcnZpY2VzLmhhc093blByb3BlcnR5KHNlcnZpY2VOYW1lKSkge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmVycm9yKFNlcnZpY2VSZWdpc3RyeUltcGwuU0VSVklDRV9OT1RfUkVHSVNURVJFRCwgW3NlcnZpY2VOYW1lXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX3NlcnZpY2VzW3NlcnZpY2VOYW1lXSBhcyBUO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIHN0YXRpYyBjbGFzcyB1c2VkIGZvciBnZXR0aW5nIGFjY2VzcyB0byB0aGUgc2luZ2xlIGluc3RhbmNlXHJcbiAqIG9mIHRoZSBBcGlTZXJ2aWNlUmVnaXN0cnlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBcGlTZXJ2aWNlUmVnaXN0cnkge1xyXG4gIHByaXZhdGUgc3RhdGljIFNFUlZJQ0VfUkVHSVNUUllfRkFJTEVEOiBzdHJpbmcgPSAnQXNzaWduaW5nIHNlcnZpY2UgcmVnaXN0cnkgZmFpbGVkJztcclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBzaW5nbGV0b24gaW5zdGFuY2Ugb2YgdGhlIFNlcnZpY2VSZWdpc3RyeVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGluc3RhbmNlKCk6IFNlcnZpY2VSZWdpc3RyeSB7XHJcbiAgICBpZiAoIXdpbmRvdy5fX3RhYmxlYXVBcGlTZXJ2aWNlUmVnaXN0cnkpIHtcclxuICAgICAgQXBpU2VydmljZVJlZ2lzdHJ5LnNldEluc3RhbmNlKG5ldyBTZXJ2aWNlUmVnaXN0cnlJbXBsKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghd2luZG93Ll9fdGFibGVhdUFwaVNlcnZpY2VSZWdpc3RyeSkge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmVycm9yKEFwaVNlcnZpY2VSZWdpc3RyeS5TRVJWSUNFX1JFR0lTVFJZX0ZBSUxFRCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHdpbmRvdy5fX3RhYmxlYXVBcGlTZXJ2aWNlUmVnaXN0cnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIZWxwZXIgbWV0aG9kIHRvIG92ZXJyaWRlIHRoZSByZWdpc3RyeSBpbnN0YW5jZS4gQ2FuIGJlIHVzZWQgYnkgdW5pdCB0ZXN0c1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTZXJ2aWNlUmVnaXN0cnl9IHNlcnZpY2VSZWdpc3RyeSBUaGUgbmV3IHJlZ2lzdHJ5XHJcbiAgICovXHJcbiAgcHVibGljIHN0YXRpYyBzZXRJbnN0YW5jZShzZXJ2aWNlUmVnaXN0cnk/OiBTZXJ2aWNlUmVnaXN0cnkpOiB2b2lkIHtcclxuICAgIHdpbmRvdy5fX3RhYmxlYXVBcGlTZXJ2aWNlUmVnaXN0cnkgPSBzZXJ2aWNlUmVnaXN0cnk7XHJcbiAgfVxyXG5cclxuICAvLyBQcml2YXRlIHRvIGF2b2lkIGFueW9uZSBjb25zdHJ1Y3RpbmcgdGhpc1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvU2VydmljZXMvU2VydmljZVJlZ2lzdHJ5LnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHtcclxuICBEYXRhVGFibGUgYXMgRGF0YVRhYmxlSW50ZXJuYWxDb250cmFjdCxcclxuICBFeGVjdXRlUGFyYW1ldGVycyxcclxuICBIaWdobGlnaHRlZE1hcmtzVGFibGUsXHJcbiAgSW50ZXJuYWxBcGlEaXNwYXRjaGVyLFxyXG4gIFBhcmFtZXRlcklkLFxyXG4gIFNlbGVjdGVkTWFya3NUYWJsZSxcclxuICBVbmRlcmx5aW5nRGF0YVRhYmxlLFxyXG4gIFZlcmJJZCxcclxuICBWaXN1YWxJZCxcclxufSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuaW1wb3J0IHsgQ29sdW1uLCBEYXRhVGFibGUsIERhdGFWYWx1ZSwgTWFya0luZm8gfSBmcm9tICcuLi8uLi9Nb2RlbHMvR2V0RGF0YU1vZGVscyc7XHJcbmltcG9ydCB7IEdldERhdGFTZXJ2aWNlLCBHZXREYXRhVHlwZSB9IGZyb20gJy4uL0dldERhdGFTZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vU2VydmljZVJlZ2lzdHJ5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBHZXREYXRhU2VydmljZUltcGwgaW1wbGVtZW50cyBHZXREYXRhU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfZGlzcGF0Y2hlcjogSW50ZXJuYWxBcGlEaXNwYXRjaGVyO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoZGlzcGF0Y2hlcjogSW50ZXJuYWxBcGlEaXNwYXRjaGVyKSB7XHJcbiAgICB0aGlzLl9kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2VydmljZU5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBTZXJ2aWNlTmFtZXMuR2V0RGF0YTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRVbmRlcmx5aW5nRGF0YUFzeW5jKFxyXG4gICAgdmlzdWFsSWQ6IFZpc3VhbElkLFxyXG4gICAgZ2V0VHlwZTogR2V0RGF0YVR5cGUsXHJcbiAgICBpZ25vcmVBbGlhc2VzOiBib29sZWFuLFxyXG4gICAgaWdub3JlU2VsZWN0aW9uOiBib29sZWFuLFxyXG4gICAgaW5jbHVkZUFsbENvbHVtbnM6IGJvb2xlYW4sXHJcbiAgICBtYXhSb3dzOiBudW1iZXIpOiBQcm9taXNlPERhdGFUYWJsZT4ge1xyXG4gICAgICAvLyBDcmVhdGUgYWxsIG9mIG91ciBwYXJhbWV0ZXJzXHJcbiAgICAgIGNvbnN0IHZlcmIgPSBnZXRUeXBlID09PSBHZXREYXRhVHlwZS5TdW1tYXJ5ID8gVmVyYklkLkdldERhdGFTdW1tYXJ5RGF0YSA6IFZlcmJJZC5HZXRVbmRlcmx5aW5nRGF0YTtcclxuICAgICAgY29uc3QgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMgPSB7fTtcclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5WaXN1YWxJZF0gPSB2aXN1YWxJZDtcclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5JZ25vcmVBbGlhc2VzXSA9IGlnbm9yZUFsaWFzZXM7XHJcbiAgICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuSWdub3JlU2VsZWN0aW9uXSA9IGlnbm9yZVNlbGVjdGlvbjtcclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5JbmNsdWRlQWxsQ29sdW1uc10gPSBpbmNsdWRlQWxsQ29sdW1ucztcclxuICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5NYXhSb3dzXSA9IG1heFJvd3M7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5leGVjdXRlKHZlcmIsIHBhcmFtZXRlcnMpLnRoZW48RGF0YVRhYmxlPihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gcmVzcG9uc2UucmVzdWx0IGFzIFVuZGVybHlpbmdEYXRhVGFibGU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1Jlc3VsdHNUYWJsZShyZXNwb25zZURhdGEuZGF0YSwgcmVzcG9uc2VEYXRhLmlzU3VtbWFyeSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U2VsZWN0ZWRNYXJrc0FzeW5jKHZpc3VhbElkOiBWaXN1YWxJZCk6IFByb21pc2U8Q29udHJhY3QuTWFya3NDb2xsZWN0aW9uPiB7XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHsgW1BhcmFtZXRlcklkLlZpc3VhbElkXTogdmlzdWFsSWQgfTtcclxuICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmV4ZWN1dGUoVmVyYklkLkdldFNlbGVjdGVkTWFya3MsIHBhcmFtZXRlcnMpLnRoZW48Q29udHJhY3QuTWFya3NDb2xsZWN0aW9uPihyZXNwb25zZSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IHJlc3BvbnNlLnJlc3VsdCBhcyBTZWxlY3RlZE1hcmtzVGFibGU7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLmRhdGEubWFwKHRhYmxlID0+IHRoaXMucHJvY2Vzc1Jlc3VsdHNUYWJsZSh0YWJsZSwgdHJ1ZSkpXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRIaWdobGlnaHRlZE1hcmtzQXN5bmModmlzdWFsSWQ6IFZpc3VhbElkKTogUHJvbWlzZTxDb250cmFjdC5NYXJrc0NvbGxlY3Rpb24+IHtcclxuICAgIGNvbnN0IHBhcmFtZXRlcnM6IEV4ZWN1dGVQYXJhbWV0ZXJzID0geyBbUGFyYW1ldGVySWQuVmlzdWFsSWRdOiB2aXN1YWxJZCB9O1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rpc3BhdGNoZXIuZXhlY3V0ZShWZXJiSWQuR2V0SGlnaGxpZ2h0ZWRNYXJrcywgcGFyYW1ldGVycykudGhlbjxDb250cmFjdC5NYXJrc0NvbGxlY3Rpb24+KHJlc3BvbnNlID0+IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2VEYXRhID0gcmVzcG9uc2UucmVzdWx0IGFzIEhpZ2hsaWdodGVkTWFya3NUYWJsZTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEuZGF0YS5tYXAodGFibGUgPT4gdGhpcy5wcm9jZXNzUmVzdWx0c1RhYmxlKHRhYmxlLCB0cnVlKSlcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERhdGFTb3VyY2VEYXRhQXN5bmMoXHJcbiAgICBkYXRhU291cmNlSWQ6IHN0cmluZyxcclxuICAgIGlnbm9yZUFsaWFzZXM6IGJvb2xlYW4sXHJcbiAgICBtYXhSb3dzOiBudW1iZXIsXHJcbiAgICBjb2x1bW5zVG9JbmNsdWRlOiBBcnJheTxzdHJpbmc+KTogUHJvbWlzZTxEYXRhVGFibGU+IHtcclxuICAgICAgY29uc3QgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMgPSB7XHJcbiAgICAgICAgW1BhcmFtZXRlcklkLkRhdGFTb3VyY2VJZF06IGRhdGFTb3VyY2VJZCxcclxuICAgICAgICBbUGFyYW1ldGVySWQuSWdub3JlQWxpYXNlc106IGlnbm9yZUFsaWFzZXMsXHJcbiAgICAgICAgW1BhcmFtZXRlcklkLk1heFJvd3NdOiBtYXhSb3dzLFxyXG4gICAgICAgIFtQYXJhbWV0ZXJJZC5Db2x1bW5zVG9JbmNsdWRlXTogY29sdW1uc1RvSW5jbHVkZSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmV4ZWN1dGUoVmVyYklkLkdldERhdGFTb3VyY2VEYXRhLCBwYXJhbWV0ZXJzKS50aGVuPERhdGFUYWJsZT4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IHJlc3BvbnNlLnJlc3VsdCBhcyBVbmRlcmx5aW5nRGF0YVRhYmxlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NSZXN1bHRzVGFibGUocmVzcG9uc2VEYXRhLmRhdGEsIGZhbHNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIHByb3RlY3RlZCBwcm9jZXNzUmVzdWx0c1RhYmxlKHJlc3BvbnNlRGF0YTogRGF0YVRhYmxlSW50ZXJuYWxDb250cmFjdCwgaXNTdW1tYXJ5OiBib29sZWFuKTogRGF0YVRhYmxlIHtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSByZXNwb25zZURhdGEuaGVhZGVycy5tYXAoaCA9PiBuZXcgQ29sdW1uKGguZmllbGRDYXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDb250cmFjdC5EYXRhVHlwZS5TdHJpbmcgLypoLkRhdGFUeXBlKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGguaXNSZWZlcmVuY2VkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLmluZGV4KSk7XHJcbiAgICAvLyBUT0RPIFRoaXMgc2hvdWxkIGJlIGNvbnRyb2xsZWQgYnkgYSBmbGFnIGluZGljYXRpbmcgd2hldGhlciB0aGlzIGFwaSB3aWxsIHJlc3BvbmQgbWFya3MgaW5mbyBvciBub3RcclxuICAgIGxldCBtYXJrcztcclxuICAgIGlmIChyZXNwb25zZURhdGEubWFya3MpIHtcclxuICAgICAgbWFya3MgPSByZXNwb25zZURhdGEubWFya3MubWFwKGggPT4gbmV3IE1hcmtJbmZvKGgudHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoLmNvbG9yLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgudHVwbGVJZCkpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGFibGUgPSByZXNwb25zZURhdGEuZGF0YVRhYmxlLm1hcChyb3cgPT4ge1xyXG4gICAgICByZXR1cm4gcm93Lm1hcChjZWxsID0+IHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGFWYWx1ZShjZWxsLnZhbHVlLCBjZWxsLmZvcm1hdHRlZFZhbHVlKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAobWFya3MpIHtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRhVGFibGUodGFibGUsIGhlYWRlcnMsIHRhYmxlLmxlbmd0aCwgaXNTdW1tYXJ5LCBtYXJrcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IERhdGFUYWJsZSh0YWJsZSwgaGVhZGVycywgdGFibGUubGVuZ3RoLCBpc1N1bW1hcnkpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBEOi9kZXYvanMtYXBpL2FwaS1zaGFyZWQvc3JjL1NlcnZpY2VzL2ltcGwvR2V0RGF0YVNlcnZpY2VJbXBsLnRzXG4gKiovIiwiaW1wb3J0IHsgSW50ZXJuYWxBcGlEaXNwYXRjaGVyLCBNb2RlbCwgTm90aWZpY2F0aW9uLCBOb3RpZmljYXRpb25JZCB9IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlLCBVbnJlZ2lzdGVyRm4gfSBmcm9tICcuLi9Ob3RpZmljYXRpb25TZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vU2VydmljZVJlZ2lzdHJ5JztcclxuXHJcbmNsYXNzIFJlZ2lzdHJhdGlvbiB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfZmlsdGVyRm46IChub3RpZmljYXRpb25Nb2RlbDogTW9kZWwpID0+IGJvb2xlYW4sXHJcbiAgICBwcml2YXRlIF9jYWxsYmFja0ZuOiAobm90aWZpY2F0aW9uTW9kZWw6IE1vZGVsKSA9PiB2b2lkKSB7XHJcbiAgICAgIC8vIE5vdGhpbmcgSGVyZVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uTm90aWZpY2F0aW9uKG5vdGlmaWNhdGlvbk1vZGVsOiBNb2RlbCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX2ZpbHRlckZuKG5vdGlmaWNhdGlvbk1vZGVsKSkge1xyXG4gICAgICB0aGlzLl9jYWxsYmFja0ZuKG5vdGlmaWNhdGlvbk1vZGVsKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25TZXJ2aWNlSW1wbCBpbXBsZW1lbnRzIE5vdGlmaWNhdGlvblNlcnZpY2Uge1xyXG4gIHByaXZhdGUgX2hhbmRsZXJzOiB7IFtub3RpZmljYXRpb25JZDogc3RyaW5nXTogQXJyYXk8UmVnaXN0cmF0aW9uPiB9O1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBkaXNwYXRjaGVyOiBJbnRlcm5hbEFwaURpc3BhdGNoZXIpIHtcclxuICAgIHRoaXMuX2hhbmRsZXJzID0ge307XHJcbiAgICB0aGlzLmRpc3BhdGNoZXIucmVnaXN0ZXJOb3RpZmljYXRpb25IYW5kbGVyKHRoaXMub25Ob3RpZmljYXRpb24uYmluZCh0aGlzKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNlcnZpY2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU2VydmljZU5hbWVzLk5vdGlmaWNhdGlvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWdpc3RlckhhbmRsZXIoaWQ6IE5vdGlmaWNhdGlvbklkLCBmaWx0ZXJGbjogKG1vZGVsOiBNb2RlbCkgPT4gYm9vbGVhbiwgaGFuZGxlcjogKG1vZGVsOiBNb2RlbCkgPT4gdm9pZCk6IFVucmVnaXN0ZXJGbiB7XHJcbiAgICBjb25zdCBoYW5kbGVycyA9IHRoaXMuX2hhbmRsZXJzW2lkXSB8fCBuZXcgQXJyYXk8UmVnaXN0cmF0aW9uPigpO1xyXG4gICAgY29uc3QgcmVnaXN0cmF0aW9uID0gbmV3IFJlZ2lzdHJhdGlvbihmaWx0ZXJGbiwgaGFuZGxlcik7XHJcbiAgICBoYW5kbGVycy5wdXNoKHJlZ2lzdHJhdGlvbik7XHJcbiAgICB0aGlzLl9oYW5kbGVyc1tpZF0gPSBoYW5kbGVycztcclxuICAgIHJldHVybiAoKSA9PiB0aGlzLnJlbW92ZVJlZ2lzdHJhdGlvbihpZCwgcmVnaXN0cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaGFzSGFuZGxlcnNGb3JOb3RpZmljYXRpb25UeXBlKGlkOiBOb3RpZmljYXRpb25JZCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hhbmRsZXJzLmhhc093blByb3BlcnR5KGlkKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Ob3RpZmljYXRpb24obm90aWZpY2F0aW9uOiBOb3RpZmljYXRpb24pOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5oYXNIYW5kbGVyc0Zvck5vdGlmaWNhdGlvblR5cGUobm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbklkKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gR28gdGhyb3VnaCBhbmQgY2hlY2sgZm9yIGFsbCB0aGUgaGFuZGxlcnMgb2YgdGhpcyBwYXJ0aWN1bGFyIG5vdGlmaWNhdGlvblxyXG4gICAgdGhpcy5faGFuZGxlcnNbbm90aWZpY2F0aW9uLm5vdGlmaWNhdGlvbklkXS5mb3JFYWNoKGggPT4gaC5vbk5vdGlmaWNhdGlvbihub3RpZmljYXRpb24uZGF0YSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSByZW1vdmVSZWdpc3RyYXRpb24oaWQ6IE5vdGlmaWNhdGlvbklkLCByZWdpc3RyYXRpb246IFJlZ2lzdHJhdGlvbik6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmhhc0hhbmRsZXJzRm9yTm90aWZpY2F0aW9uVHlwZShpZCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2hhbmRsZXJzW2lkXSA9IHRoaXMuX2hhbmRsZXJzW2lkXS5maWx0ZXIocmVnID0+IHJlZyAhPT0gcmVnaXN0cmF0aW9uKTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9pbXBsL05vdGlmaWNhdGlvblNlcnZpY2VJbXBsLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHtcclxuICBFeGVjdXRlUGFyYW1ldGVycyxcclxuICBJbnRlcm5hbEFwaURpc3BhdGNoZXIsXHJcbiAgTW9kZWwsXHJcbiAgUGFyYW1ldGVySWQsXHJcbiAgUGFyYW1ldGVySW5mbyxcclxuICBTaGVldFBhdGgsXHJcbiAgVmVyYklkLFxyXG59IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgUGFyYW1ldGVySW1wbCB9IGZyb20gJy4uLy4uL0ludGVybmFsL1BhcmFtZXRlckltcGwnO1xyXG5pbXBvcnQgeyBQYXJhbWV0ZXIgfSBmcm9tICcuLi8uLi9QYXJhbWV0ZXInO1xyXG5pbXBvcnQgeyBQYXJhbWV0ZXJzU2VydmljZSB9IGZyb20gJy4uL1BhcmFtZXRlcnNTZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vU2VydmljZVJlZ2lzdHJ5JztcclxuXHJcbmV4cG9ydCBjbGFzcyBQYXJhbWV0ZXJzU2VydmljZUltcGwgaW1wbGVtZW50cyBQYXJhbWV0ZXJzU2VydmljZSB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZGlzcGF0Y2hlcjogSW50ZXJuYWxBcGlEaXNwYXRjaGVyKSB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNlcnZpY2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gU2VydmljZU5hbWVzLlBhcmFtZXRlcnM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UGFyYW1ldGVyc0ZvclNoZWV0QXN5bmMoc2hlZXRQYXRoOiBTaGVldFBhdGgsIHNoZWV0OiBDb250cmFjdC5TaGVldCk6IFByb21pc2U8QXJyYXk8UGFyYW1ldGVyPj4ge1xyXG4gICAgY29uc3QgcGFyYW1ldGVycyA9IHtcclxuICAgICAgW1BhcmFtZXRlcklkLlNoZWV0UGF0aF06IHNoZWV0UGF0aFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaGVyLmV4ZWN1dGUoVmVyYklkLkdldFBhcmFtZXRlcnNGb3JTaGVldCwgcGFyYW1ldGVycykudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIC8vIFRPRE8gLSBDaGVjayBmb3IgZXJyb3JcclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLnJlc3VsdCBhcyBBcnJheTxQYXJhbWV0ZXJJbmZvPjtcclxuICAgICAgcmV0dXJuIHJlc3VsdC5tYXAocGFyYW1ldGVySW5mbyA9PiB7XHJcbiAgICAgICAgY29uc3QgaW1wbCA9IG5ldyBQYXJhbWV0ZXJJbXBsKHBhcmFtZXRlckluZm8pO1xyXG4gICAgICAgIHJldHVybiBuZXcgUGFyYW1ldGVyKGltcGwsIHNoZWV0KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjaGFuZ2VQYXJhbWV0ZXJWYWx1ZUFzeW5jKGZpZWxkTmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKTogUHJvbWlzZTxQYXJhbWV0ZXJJbmZvPiB7XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJzID0ge1xyXG4gICAgICBbUGFyYW1ldGVySWQuUGFyYW1ldGVyRmllbGROYW1lXTogZmllbGROYW1lLFxyXG4gICAgICBbUGFyYW1ldGVySWQuUGFyYW1ldGVyVmFsdWVdOiBuZXdWYWx1ZVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaGVyLmV4ZWN1dGUoVmVyYklkLkNoYW5nZVBhcmFtZXRlclZhbHVlLCBwYXJhbWV0ZXJzKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UucmVzdWx0IGFzIFBhcmFtZXRlckluZm87XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaW5kUGFyYW1ldGVyQnlOYW1lQXN5bmMobmFtZTogc3RyaW5nLCBzaGVldDogQ29udHJhY3QuU2hlZXQpOiBQcm9taXNlPFBhcmFtZXRlciB8IHVuZGVmaW5lZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZFBhcmFtZXRlckFzeW5jKHNoZWV0LCBuYW1lLCB1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbmRQYXJhbWV0ZXJCeUdsb2JhbEZpZWxkTmFtZUFzeW5jKGZpZWxkTmFtZTogc3RyaW5nLCBzaGVldDogQ29udHJhY3QuU2hlZXQpOiBQcm9taXNlPFBhcmFtZXRlciB8IHVuZGVmaW5lZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZFBhcmFtZXRlckFzeW5jKHNoZWV0LCB1bmRlZmluZWQsIGZpZWxkTmFtZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGZpbmRQYXJhbWV0ZXJBc3luYyhcclxuICAgIHNoZWV0OiBDb250cmFjdC5TaGVldCxcclxuICAgIG5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCxcclxuICAgIGZpZWxkTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkKTogUHJvbWlzZTxQYXJhbWV0ZXIgfCB1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0IHBhcmFtZXRlcnM6IEV4ZWN1dGVQYXJhbWV0ZXJzID0ge307XHJcbiAgICBpZiAobmFtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHBhcmFtZXRlcnNbUGFyYW1ldGVySWQuUGFyYW1ldGVyQ2FwdGlvbl0gPSBuYW1lO1xyXG4gICAgfSBlbHNlIGlmIChmaWVsZE5hbWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLlBhcmFtZXRlckZpZWxkTmFtZV0gPSBmaWVsZE5hbWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLm1pc3NpbmdQYXJhbWV0ZXIoWydmaWVsZCBuYW1lIG9yIGNhcHRpb24nXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5GaW5kUGFyYW1ldGVyLCBwYXJhbWV0ZXJzKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgY29uc3QgaW5zdGFuY2VPZlBhcmFtZXRlckluZm8gPSAob2JqZWN0OiBNb2RlbCk6IG9iamVjdCBpcyBQYXJhbWV0ZXJJbmZvID0+IHtcclxuICAgICAgICByZXR1cm4gJ2ZpZWxkTmFtZScgaW4gb2JqZWN0O1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayB0byBzZWUgaWYgd2UgZ290IGEgdmFsaWQgcmVzcG9uc2UgYmFjayBhZ2FpblxyXG4gICAgICBpZiAoaW5zdGFuY2VPZlBhcmFtZXRlckluZm8ocmVzcG9uc2UucmVzdWx0KSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLnJlc3VsdCBhcyBQYXJhbWV0ZXJJbmZvO1xyXG4gICAgICAgIGNvbnN0IGltcGwgPSBuZXcgUGFyYW1ldGVySW1wbChyZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUGFyYW1ldGVyKGltcGwsIHNoZWV0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9pbXBsL1BhcmFtZXRlcnNTZXJ2aWNlSW1wbC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvbklkLCBQYXJhbWV0ZXJJbmZvIH0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgUGFyYW0gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzIH0gZnJvbSAnLi4vRW51bU1hcHBpbmdzL0ludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncyc7XHJcbmltcG9ydCB7IFBhcmFtZXRlckNoYW5nZWRFdmVudCB9IGZyb20gJy4uL0V2ZW50cy9QYXJhbWV0ZXJDaGFuZ2VkRXZlbnQnO1xyXG5pbXBvcnQgeyBEYXRhVmFsdWUgfSBmcm9tICcuLi9Nb2RlbHMvR2V0RGF0YU1vZGVscyc7XHJcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UgfSBmcm9tICcuLi9TZXJ2aWNlcy9Ob3RpZmljYXRpb25TZXJ2aWNlJztcclxuaW1wb3J0IHsgUGFyYW1ldGVyc1NlcnZpY2UgfSBmcm9tICcuLi9TZXJ2aWNlcy9QYXJhbWV0ZXJzU2VydmljZSc7XHJcbmltcG9ydCB7IEFwaVNlcnZpY2VSZWdpc3RyeSwgU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vU2VydmljZXMvU2VydmljZVJlZ2lzdHJ5JztcclxuaW1wb3J0IHsgU2luZ2xlRXZlbnRNYW5hZ2VyIH0gZnJvbSAnLi4vU2luZ2xlRXZlbnRNYW5hZ2VyJztcclxuaW1wb3J0IHsgU2luZ2xlRXZlbnRNYW5hZ2VySW1wbCB9IGZyb20gJy4vU2luZ2xlRXZlbnRNYW5hZ2VySW1wbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgUGFyYW1ldGVySW1wbCB7XHJcbiAgcHJpdmF0ZSBfYWxsb3dhYmxlVmFsdWVzOiBDb250cmFjdC5QYXJhbWV0ZXJEb21haW5SZXN0cmljdGlvbjtcclxuICBwcml2YXRlIF9nbG9iYWxGaWVsZE5hbWU6IHN0cmluZztcclxuICBwcml2YXRlIF9wYXJhbWV0ZXJJbmZvOiBQYXJhbWV0ZXJJbmZvO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IocGFyYW1ldGVySW5mbzogUGFyYW1ldGVySW5mbykge1xyXG4gICAgdGhpcy5zZXRQYXJhbWV0ZXJJbmZvKHBhcmFtZXRlckluZm8pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fcGFyYW1ldGVySW5mby5uYW1lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBjdXJyZW50VmFsdWUoKTogRGF0YVZhbHVlIHtcclxuICAgIHJldHVybiBuZXcgRGF0YVZhbHVlKHRoaXMuX3BhcmFtZXRlckluZm8uY3VycmVudFZhbHVlLnZhbHVlLCB0aGlzLl9wYXJhbWV0ZXJJbmZvLmN1cnJlbnRWYWx1ZS5mb3JtYXR0ZWRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGRhdGFUeXBlKCk6IENvbnRyYWN0LkRhdGFUeXBlIHtcclxuICAgIHJldHVybiBJbnRlcm5hbFRvRXh0ZXJuYWxFbnVtTWFwcGluZ3MuZGF0YVR5cGUuY29udmVydCh0aGlzLl9wYXJhbWV0ZXJJbmZvLmRhdGFUeXBlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9nbG9iYWxGaWVsZE5hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGFsbG93YWJsZVZhbHVlcygpOiBDb250cmFjdC5QYXJhbWV0ZXJEb21haW5SZXN0cmljdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fYWxsb3dhYmxlVmFsdWVzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoYW5nZVZhbHVlQXN5bmMobmV3VmFsdWU6IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBEYXRlKTogUHJvbWlzZTxEYXRhVmFsdWU+IHtcclxuICAgIGxldCBjb2VyY2VkVmFsdWUgPSBQYXJhbS5zZXJpYWxpemVQYXJhbXRlclZhbHVlKG5ld1ZhbHVlKTtcclxuICAgIGNvbnN0IHBhcmFtZXRlcnNTZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8UGFyYW1ldGVyc1NlcnZpY2U+KFNlcnZpY2VOYW1lcy5QYXJhbWV0ZXJzKTtcclxuICAgIHJldHVybiBwYXJhbWV0ZXJzU2VydmljZS5jaGFuZ2VQYXJhbWV0ZXJWYWx1ZUFzeW5jKHRoaXMuX2dsb2JhbEZpZWxkTmFtZSwgY29lcmNlZFZhbHVlKS50aGVuKHBhcmFtZXRlckluZm8gPT4ge1xyXG4gICAgICB0aGlzLnNldFBhcmFtZXRlckluZm8ocGFyYW1ldGVySW5mbyk7XHJcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSGVscGVyIG1ldGhvZCB3aGljaCBnb2VzIHRocm91Z2ggYW5kIHJlZ2lzdGVycyBlYWNoIGV2ZW50IHR5cGUgdGhpcyBpbXBsIGtub3dzIGFib3V0XHJcbiAgICogd2l0aCB0aGUgTm90aWZpY2F0aW9uU2VydmljZS4gSXQgcmV0dXJucyBhbiBhcnJheSBvZiBTaW5nbGVFdmVudE1hbmFnZXIgb2JqZWN0cyB3aGljaFxyXG4gICAqIGNhbiB0aGVuIGJlIHBhc3NlZCB0byBhbiBFdmVudExpc3RlbmVyTWFuYWdlciB0byBoYW5kbGUgdXNlciByZWdpc3RyYXRpb24gLyB1bnJlZ2lzdHJhdGlvbi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBzaGVldCBUaGUgc2hlZXQgb2JqZWN0IHdoaWNoIHdpbGwgYmUgaW5jbHVkZWQgd2l0aCB0aGUgZXZlbnQgbm90aWZpY2F0aW9uc1xyXG4gICAqIEByZXR1cm5zIHtBcnJheTxTaW5nbGVFdmVudE1hbmFnZXI+fSBDb2xsZWN0aW9uIG9mIGV2ZW50IG1hbmFnZXJzIHRvIHBhc3MgdG8gYW4gRXZlbnRMaXN0ZW5lck1hbmFnZXJcclxuICAgKi9cclxuICBwdWJsaWMgaW5pdGlhbGl6ZUV2ZW50cyhzaGVldDogQ29udHJhY3QuU2hlZXQpOiBBcnJheTxTaW5nbGVFdmVudE1hbmFnZXI+IHtcclxuICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgQXJyYXk8U2luZ2xlRXZlbnRNYW5hZ2VyPigpO1xyXG4gICAgbGV0IG5vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2U7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbm90aWZpY2F0aW9uU2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPE5vdGlmaWNhdGlvblNlcnZpY2U+KFNlcnZpY2VOYW1lcy5Ob3RpZmljYXRpb24pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIHRoaXMgc2VydmljZSByZWdpc3RlcmVkLCBqdXN0IHJldHVyblxyXG4gICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbml0aWFsaXplIGFsbCBvZiB0aGUgZXZlbnQgbWFuYWdlcnMgd2UnbGwgbmVlZCAob25lIGZvciBlYWNoIGV2ZW50IHR5cGUpXHJcbiAgICBjb25zdCBwYXJhbWV0ZXJFdmVudCA9IG5ldyBTaW5nbGVFdmVudE1hbmFnZXJJbXBsPFBhcmFtZXRlckNoYW5nZWRFdmVudD4oQ29udHJhY3QuVGFibGVhdUV2ZW50VHlwZS5QYXJhbWV0ZXJDaGFuZ2VkKTtcclxuICAgIG5vdGlmaWNhdGlvblNlcnZpY2UucmVnaXN0ZXJIYW5kbGVyKE5vdGlmaWNhdGlvbklkLlBhcmFtZXRlckNoYW5nZWQsIChtb2RlbCkgPT4ge1xyXG4gICAgICBjb25zdCBmaWVsZE5hbWUgPSBtb2RlbCBhcyBzdHJpbmc7XHJcbiAgICAgIHJldHVybiBmaWVsZE5hbWUgPT09IHRoaXMuX2dsb2JhbEZpZWxkTmFtZTtcclxuICAgIH0sIChmaWVsZE5hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBwYXJhbWV0ZXJFdmVudC50cmlnZ2VyRXZlbnQoKCkgPT4gbmV3IFBhcmFtZXRlckNoYW5nZWRFdmVudChmaWVsZE5hbWUsIHNoZWV0KSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXN1bHRzLnB1c2gocGFyYW1ldGVyRXZlbnQpO1xyXG5cclxuICAgIHJldHVybiByZXN1bHRzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRQYXJhbWV0ZXJJbmZvKHBhcmFtZXRlckluZm86IFBhcmFtZXRlckluZm8pOiB2b2lkIHtcclxuICAgIHRoaXMuX3BhcmFtZXRlckluZm8gPSBwYXJhbWV0ZXJJbmZvO1xyXG4gICAgdGhpcy5fZ2xvYmFsRmllbGROYW1lID0gcGFyYW1ldGVySW5mby5maWVsZE5hbWU7XHJcblxyXG4gICAgY29uc3QgdHlwZSA9IEludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncy5hbGxvd2FibGVWYWx1ZXMuY29udmVydChwYXJhbWV0ZXJJbmZvLmFsbG93YWJsZVZhbHVlc1R5cGUpO1xyXG4gICAgbGV0IGxpc3RWYWx1ZXM6IEFycmF5PERhdGFWYWx1ZT4gfCB1bmRlZmluZWQ7XHJcbiAgICBsZXQgbWluVmFsdWU6IERhdGFWYWx1ZSB8IHVuZGVmaW5lZDtcclxuICAgIGxldCBtYXhWYWx1ZTogRGF0YVZhbHVlIHwgdW5kZWZpbmVkO1xyXG4gICAgbGV0IHN0ZXBTaXplOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcbiAgICBsZXQgZGF0ZVN0ZXBQZXJpb2Q6IENvbnRyYWN0LlBlcmlvZFR5cGUgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgaWYgKHR5cGUgPT09IENvbnRyYWN0LlBhcmFtZXRlclZhbHVlVHlwZS5MaXN0KSB7XHJcbiAgICAgIGNvbnN0IHZhbHVlcyA9IHBhcmFtZXRlckluZm8uYWxsb3dhYmxlVmFsdWVzIHx8IFtdO1xyXG4gICAgICBsaXN0VmFsdWVzID0gdmFsdWVzLm1hcCh2YWwgPT4gbmV3IERhdGFWYWx1ZSh2YWwudmFsdWUsIHZhbC5mb3JtYXR0ZWRWYWx1ZSkpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSBDb250cmFjdC5QYXJhbWV0ZXJWYWx1ZVR5cGUuUmFuZ2UpIHtcclxuICAgICAgbWluVmFsdWUgPSBwYXJhbWV0ZXJJbmZvLm1pblZhbHVlICYmIG5ldyBEYXRhVmFsdWUocGFyYW1ldGVySW5mby5taW5WYWx1ZS52YWx1ZSwgcGFyYW1ldGVySW5mby5taW5WYWx1ZS5mb3JtYXR0ZWRWYWx1ZSk7XHJcbiAgICAgIG1heFZhbHVlID0gcGFyYW1ldGVySW5mby5tYXhWYWx1ZSAmJiBuZXcgRGF0YVZhbHVlKHBhcmFtZXRlckluZm8ubWF4VmFsdWUudmFsdWUsIHBhcmFtZXRlckluZm8ubWF4VmFsdWUuZm9ybWF0dGVkVmFsdWUpO1xyXG4gICAgICBzdGVwU2l6ZSA9IHBhcmFtZXRlckluZm8uc3RlcFNpemU7XHJcbiAgICAgIGRhdGVTdGVwUGVyaW9kID0gcGFyYW1ldGVySW5mby5kYXRlU3RlcFBlcmlvZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgIEludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncy5kYXRlU3RlcFBlcmlvZC5jb252ZXJ0KHBhcmFtZXRlckluZm8uZGF0ZVN0ZXBQZXJpb2QpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2FsbG93YWJsZVZhbHVlcyA9IHtcclxuICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgYWxsb3dhYmxlVmFsdWVzOiBsaXN0VmFsdWVzLFxyXG4gICAgICBtaW5WYWx1ZTogbWluVmFsdWUsXHJcbiAgICAgIG1heFZhbHVlOiBtYXhWYWx1ZSxcclxuICAgICAgc3RlcFNpemU6IHN0ZXBTaXplLFxyXG4gICAgICBkYXRlU3RlcFBlcmlvZDogZGF0ZVN0ZXBQZXJpb2RcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvSW50ZXJuYWwvUGFyYW1ldGVySW1wbC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5pbXBvcnQgeyBQYXJhbWV0ZXJzU2VydmljZSB9IGZyb20gJy4uL1NlcnZpY2VzL1BhcmFtZXRlcnNTZXJ2aWNlJztcclxuaW1wb3J0IHsgQXBpU2VydmljZVJlZ2lzdHJ5LCBTZXJ2aWNlTmFtZXMgfSBmcm9tICcuLi9TZXJ2aWNlcy9TZXJ2aWNlUmVnaXN0cnknO1xyXG5pbXBvcnQgeyBUYWJsZWF1U2hlZXRFdmVudCB9IGZyb20gJy4vVGFibGVhdVNoZWV0RXZlbnQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFBhcmFtZXRlckNoYW5nZWRFdmVudCBleHRlbmRzIFRhYmxlYXVTaGVldEV2ZW50IGltcGxlbWVudHMgQ29udHJhY3QuUGFyYW1ldGVyQ2hhbmdlZEV2ZW50IHtcclxuICBwcml2YXRlIHN0YXRpYyBQQVJBTV9OT1RfRk9VTkQ6IHN0cmluZyA9ICdVbmFibGUgdG8gZmluZCBwYXJhbWV0ZXInO1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF9nbG9iYWxGaWVsZE5hbWU6IHN0cmluZywgc2hlZXQ6IENvbnRyYWN0LlNoZWV0KSB7XHJcbiAgICBzdXBlcihDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlLlBhcmFtZXRlckNoYW5nZWQsIHNoZWV0KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQYXJhbWV0ZXJBc3luYygpOiBQcm9taXNlPENvbnRyYWN0LlBhcmFtZXRlcj4ge1xyXG4gICAgLy8gQ2FsbCBkb3duIHRvIG91ciBzZXJ2aWNlIHRvIGdldCB0aGUgcGFyYW1ldGVyIGJhY2sgdmlhIGl0cyBmaWVsZCBuYW1lXHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8UGFyYW1ldGVyc1NlcnZpY2U+KFNlcnZpY2VOYW1lcy5QYXJhbWV0ZXJzKTtcclxuICAgIHJldHVybiBzZXJ2aWNlLmZpbmRQYXJhbWV0ZXJCeUdsb2JhbEZpZWxkTmFtZUFzeW5jKHRoaXMuX2dsb2JhbEZpZWxkTmFtZSwgdGhpcy5zaGVldCkudGhlbihwYXJhbWV0ZXIgPT4ge1xyXG4gICAgICBpZiAocGFyYW1ldGVyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmVycm9yKFBhcmFtZXRlckNoYW5nZWRFdmVudC5QQVJBTV9OT1RfRk9VTkQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gcGFyYW1ldGVyO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvRXZlbnRzL1BhcmFtZXRlckNoYW5nZWRFdmVudC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7XHJcbiAgRXhlY3V0ZVBhcmFtZXRlcnMsXHJcbiAgSW50ZXJuYWxBcGlEaXNwYXRjaGVyLFxyXG4gIFBhcmFtZXRlcklkLFxyXG4gIFF1YW50aXRhdGl2ZUluY2x1ZGVkVmFsdWVzLFxyXG4gIFNlbGVjdGlvblVwZGF0ZVR5cGUgYXMgU2VsZWN0aW9uVXBkYXRlVHlwZUludGVybmFsLFxyXG4gIFZlcmJJZCxcclxuICBWaXN1YWxJZFxyXG59IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5pbXBvcnQgeyBEaW1lbnNpb25TZWxlY3Rpb25Nb2RlbCxcclxuICBIaWVyYXJjaGljYWxTZWxlY3Rpb25Nb2RlbCxcclxuICBSYW5nZVNlbGVjdGlvbk1vZGVsLFxyXG4gIFNlbGVjdGlvbk1vZGVsc0NvbnRhaW5lcixcclxuICBUdXBsZVNlbGVjdGlvbk1vZGVsLFxyXG4gIFZhbHVlU2VsZWN0aW9uTW9kZWxcclxufSBmcm9tICcuLi8uLi9Nb2RlbHMvU2VsZWN0aW9uTW9kZWxzJztcclxuaW1wb3J0IHsgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4uL1NlbGVjdGlvblNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlTmFtZXMgfSBmcm9tICcuLi9TZXJ2aWNlUmVnaXN0cnknO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvblNlcnZpY2VJbXBsIGltcGxlbWVudHMgU2VsZWN0aW9uU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBfZGlzcGF0Y2hlcjogSW50ZXJuYWxBcGlEaXNwYXRjaGVyO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoZGlzcGF0Y2hlcjogSW50ZXJuYWxBcGlEaXNwYXRjaGVyKSB7XHJcbiAgICB0aGlzLl9kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2VydmljZU5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBTZXJ2aWNlTmFtZXMuU2VsZWN0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRvIGNsZWFyIGFsbCB0aGUgc2VsZWN0ZWQgbWFya3MgZm9yIHRoZSBnaXZlbiB3b3Jrc2hlZXQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gdmlzdWFsSWRcclxuICAgKi9cclxuICBwdWJsaWMgY2xlYXJTZWxlY3RlZE1hcmtzQXN5bmModmlzdWFsSWQ6IFZpc3VhbElkKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHtbUGFyYW1ldGVySWQuVmlzdWFsSWRdOiB2aXN1YWxJZH07XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5DbGVhclNlbGVjdGVkTWFya3MsIHBhcmFtZXRlcnMpLnRoZW48dm9pZD4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICByZXR1cm4gOyAvLyBFeHBlY3RpbmcgYW4gZW1wdHkgbW9kZWwgYW5kIGhlbmNlIHRoZSB2b2lkIHJlc3BvbnNlLlxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gc2VsZWN0IG1hcmtzIGZvciB0aGUgZ2l2ZW4gd29ya3NoZWV0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHZpc3VhbElkXHJcbiAgICogQHBhcmFtIHNlbGVjdGlvbkNyaXRlcmlhXHJcbiAgICogQHBhcmFtIHNlbGVjdGlvblVwZGF0ZVR5cGVcclxuICAgKi9cclxuICBwdWJsaWMgc2VsZWN0TWFya3NCeVZhbHVlQXN5bmModmlzdWFsSWQ6IFZpc3VhbElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25Dcml0ZXJpYXM6IEFycmF5PENvbnRyYWN0LlNlbGVjdGlvbkNyaXRlcmlhPixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlVHlwZTogQ29udHJhY3QuU2VsZWN0aW9uVXBkYXRlVHlwZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKHNlbGVjdGlvbkNyaXRlcmlhcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5pbnZhbGlkKFsnU2VsZWN0aW9uIGNyaXRlcmlhJywgJ1NlbGVjdGlvbnMgbWlzc2luZy4nXSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0aW9uVHlwZTogc3RyaW5nID0gdGhpcy52YWxpZGF0ZVNlbGVjdGlvblVwZGF0ZVR5cGUoc2VsZWN0aW9uVXBkYXRlVHlwZSk7XHJcbiAgICBsZXQgc2VsZWN0aW9uQ3JpdGVyaWFUeXBlOiBTZWxlY3Rpb25Dcml0ZXJpYVR5cGUgPSB0aGlzLnZhbGlkYXRlU2VsZWN0aW9uQ3JpdGVyaWEoc2VsZWN0aW9uQ3JpdGVyaWFzWzBdKTtcclxuICAgIGxldCBzZWxlY3Rpb25Nb2RlbENvbnRhaW5lcjogU2VsZWN0aW9uTW9kZWxzQ29udGFpbmVyID0gdGhpcy5wYXJzZVNlbGVjdGlvbk1hcmtzKHNlbGVjdGlvbkNyaXRlcmlhcywgc2VsZWN0aW9uQ3JpdGVyaWFUeXBlKTtcclxuXHJcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHtcclxuICAgICAgW1BhcmFtZXRlcklkLlZpc3VhbElkXTogdmlzdWFsSWQsXHJcbiAgICAgIFtQYXJhbWV0ZXJJZC5TZWxlY3Rpb25VcGRhdGVUeXBlXTogc2VsZWN0aW9uVHlwZVxyXG4gICAgfTtcclxuXHJcbiAgICBzd2l0Y2ggKHNlbGVjdGlvbkNyaXRlcmlhVHlwZSkge1xyXG4gICAgICBjYXNlIFNlbGVjdGlvbkNyaXRlcmlhVHlwZS5IaWVyYXJjaGljYWxUeXBlOiB7XHJcbiAgICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5IaWVyVmFsU2VsZWN0aW9uTW9kZWxzXSA9IHNlbGVjdGlvbk1vZGVsQ29udGFpbmVyLmhpZXJNb2RlbEFycjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFNlbGVjdGlvbkNyaXRlcmlhVHlwZS5SYW5nZVR5cGU6IHtcclxuICAgICAgICBwYXJhbWV0ZXJzW1BhcmFtZXRlcklkLlF1YW50UmFuZ2VTZWxlY3Rpb25Nb2RlbHNdID0gc2VsZWN0aW9uTW9kZWxDb250YWluZXIucXVhbnRNb2RlbEFycjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIFNlbGVjdGlvbkNyaXRlcmlhVHlwZS5EaW1lbnNpb25UeXBlOiB7XHJcbiAgICAgICAgcGFyYW1ldGVyc1tQYXJhbWV0ZXJJZC5EaW1WYWxTZWxlY3Rpb25Nb2RlbHNdID0gc2VsZWN0aW9uTW9kZWxDb250YWluZXIuZGltTW9kZWxBcnI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9kaXNwYXRjaGVyLmV4ZWN1dGUoVmVyYklkLlNlbGVjdEJ5VmFsdWUsIHBhcmFtZXRlcnMpLnRoZW48dm9pZD4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAvLyBFeHBlY3RpbmcgYW4gZW1wdHkgbW9kZWwgYW5kIGhlbmNlIHRoZSB2b2lkIHJlc3BvbnNlLlxyXG4gICAgICByZXR1cm47XHJcbiAgICAgIC8vIFRPRE8gSW52ZXN0aWdhdGUgdGhlIGVycm9yIHJlc3BvbnNlIHdpdGggbXVsdGlwbGUgb3V0cHV0IHBhcmFtcyBhbmQgdGhyb3cgZXJyb3IgYWNjb3JkaW5nbHkuXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICogTWV0aG9kIHRvIHNlbGVjdCBtYXJrcyBmb3IgdGhlIGdpdmVuIHdvcmtzaGVldC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB2aXN1YWxJZFxyXG4gICAqIEBwYXJhbSBNYXJrSW5mb1xyXG4gICAqIEBwYXJhbSBzZWxlY3Rpb25VcGRhdGVUeXBlXHJcbiAgICovXHJcbiAgcHVibGljIHNlbGVjdE1hcmtzQnlJZEFzeW5jKHZpc3VhbElkOiBWaXN1YWxJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya3M6IEFycmF5PENvbnRyYWN0Lk1hcmtJbmZvPixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlVHlwZTogQ29udHJhY3QuU2VsZWN0aW9uVXBkYXRlVHlwZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgaWYgKG1hcmtzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmludmFsaWQoWydTZWxlY3Rpb24nLCAnTWFya3MgaW5mbyBtaXNzaW5nLiddKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3Rpb25UeXBlOiBzdHJpbmcgPSB0aGlzLnZhbGlkYXRlU2VsZWN0aW9uVXBkYXRlVHlwZShzZWxlY3Rpb25VcGRhdGVUeXBlKTtcclxuICAgIGxldCBzZWxlY3Rpb25Nb2RlbENvbnRhaW5lcjogU2VsZWN0aW9uTW9kZWxzQ29udGFpbmVyID0gdGhpcy5wYXJzZVNlbGVjdGlvbklkcyhtYXJrcyk7XHJcblxyXG4gICAgY29uc3QgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMgPSB7XHJcbiAgICAgIFtQYXJhbWV0ZXJJZC5WaXN1YWxJZF06IHZpc3VhbElkLFxyXG4gICAgICBbUGFyYW1ldGVySWQuU2VsZWN0aW9uVXBkYXRlVHlwZV06IHNlbGVjdGlvblR5cGUsXHJcbiAgICAgIFtQYXJhbWV0ZXJJZC5TZWxlY3Rpb25dOiBzZWxlY3Rpb25Nb2RlbENvbnRhaW5lci5zZWxlY3Rpb25cclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5TZWxlY3RCeVZhbHVlLCBwYXJhbWV0ZXJzKS50aGVuPHZvaWQ+KHJlc3BvbnNlID0+IHtcclxuICAgICAgLy8gRXhwZWN0aW5nIGFuIGVtcHR5IG1vZGVsIGFuZCBoZW5jZSB0aGUgdm9pZCByZXNwb25zZS5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgICAvLyBUT0RPIEludmVzdGlnYXRlIHRoZSBlcnJvciByZXNwb25zZSB3aXRoIG11bHRpcGxlIG91dHB1dCBwYXJhbXMgYW5kIHRocm93IGVycm9yIGFjY29yZGluZ2x5LlxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gcHJlcGFyZSB0aGUgcHJlcyBtb2RlbHMgZm9yIHNlbGVjdGlvbiBieSBNYXJrc0luZm9cclxuICAgKiBAcGFyYW0gbWFya3NcclxuICAgKi9cclxuICBwcml2YXRlIHBhcnNlU2VsZWN0aW9uSWRzKG1hcmtzOiBBcnJheTxDb250cmFjdC5NYXJrSW5mbz4pOiBTZWxlY3Rpb25Nb2RlbHNDb250YWluZXIge1xyXG4gICAgbGV0IGlkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgbGV0IHNlbGVjdGlvbk1vZGVsQ29udGFpbmVyOiBTZWxlY3Rpb25Nb2RlbHNDb250YWluZXIgPSBuZXcgU2VsZWN0aW9uTW9kZWxzQ29udGFpbmVyKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCB0dXBsZUlkOiBOdW1iZXIgfCB1bmRlZmluZWQgID0gbWFya3NbaV0udHVwbGVJZDtcclxuICAgICAgaWYgKHR1cGxlSWQgIT09IHVuZGVmaW5lZCAmJiB0dXBsZUlkICE9PSBudWxsKSB7IC8vIElmIHR1cGxlIGlkIGlzIHByb3ZpZGVkIHVzZSB0aGF0IGluc3RlYWQgb2YgcGFpclxyXG4gICAgICAgICBpZHMucHVzaCh0dXBsZUlkLnRvU3RyaW5nKCkpOyAvLyBjb2xsZWN0IHRoZSB0dXBsZSBpZHNcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmludmFsaWQoWyd0dXBsZUlkJ10pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaWRzLmxlbmd0aCAhPT0gMCkgeyAvLyB0dXBsZSBpZHMgYmFzZWQgc2VsZWN0aW9uXHJcbiAgICAgIGxldCB0dXBsZVNlbGVjdGlvbk1vZGVsOiBUdXBsZVNlbGVjdGlvbk1vZGVsID0gbmV3IFR1cGxlU2VsZWN0aW9uTW9kZWwoKTtcclxuICAgICAgdHVwbGVTZWxlY3Rpb25Nb2RlbC5zZWxlY3Rpb25UeXBlID0gJ3R1cGxlcyc7XHJcbiAgICAgIHR1cGxlU2VsZWN0aW9uTW9kZWwub2JqZWN0SWRzID0gaWRzO1xyXG4gICAgICBzZWxlY3Rpb25Nb2RlbENvbnRhaW5lci5zZWxlY3Rpb24gPSB0dXBsZVNlbGVjdGlvbk1vZGVsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbk1vZGVsQ29udGFpbmVyO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gcHJlcGFyZSB0aGUgcHJlcyBtb2RlbHMgZm9yIHNlbGVjdGlvbiBieSB2YWx1ZXMuXHJcbiAgICpcclxuICAgKiBTdXBwb3J0cyAzIHR5cGVzIGZvciBzZWxlY3Rpb246XHJcbiAgICogMSkgaGllcmFyY2hpY2FsIHZhbHVlIGJhc2VkIHNlbGVjdGlvblxyXG4gICAqIDIpIHJhbmdlIHZhbHVlIGJhc2VkIHNlbGVjdGlvblxyXG4gICAqIDMpIERpbWVuc2lvbiB2YWx1ZSBiYXNlZCBzZWxlY3Rpb25cclxuICAgKlxyXG4gICAqIEBwYXJhbSBtYXJrc1xyXG4gICAqIEBwYXJhbSBoaWVyTW9kZWxBcnJcclxuICAgKiBAcGFyYW0gZGltTW9kZWxBcnJcclxuICAgKiBAcGFyYW0gcXVhbnRNb2RlbEFyclxyXG4gICAqIEBwYXJhbSBzZWxlY3Rpb25cclxuICAgKi9cclxuICBwcml2YXRlIHBhcnNlU2VsZWN0aW9uTWFya3Moc2VsZWN0aW9uQ3JpdGVyaWFzOiBBcnJheTxDb250cmFjdC5TZWxlY3Rpb25Dcml0ZXJpYT4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblR5cGU6IFNlbGVjdGlvbkNyaXRlcmlhVHlwZSk6IFNlbGVjdGlvbk1vZGVsc0NvbnRhaW5lciB7XHJcbiAgICBsZXQgc2VsZWN0aW9uTW9kZWxDb250YWluZXI6IFNlbGVjdGlvbk1vZGVsc0NvbnRhaW5lciA9IG5ldyBTZWxlY3Rpb25Nb2RlbHNDb250YWluZXIoKTtcclxuICAgIGxldCBtaXhlZFNlbGVjdGlvbnNFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0aW9uQ3JpdGVyaWFzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHN0ID0gc2VsZWN0aW9uQ3JpdGVyaWFzW2ldO1xyXG4gICAgICBpZiAoc3QuZmllbGROYW1lICYmIChzdC52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHN0LnZhbHVlICE9PSBudWxsKSkge1xyXG4gICAgICAgIGxldCBjYXRSZWdleCA9IG5ldyBSZWdFeHAoJyhcXFtbQS1aYS16MC05XStdKS4qJywgJ2cnKTtcclxuICAgICAgICBsZXQgcmFuZ2VPcHRpb246IENvbnRyYWN0LlJhbmdlVmFsdWUgPSBzdC52YWx1ZSBhcyBDb250cmFjdC5SYW5nZVZhbHVlO1xyXG4gICAgICAgIGlmIChjYXRSZWdleC50ZXN0KHN0LmZpZWxkTmFtZSkpIHsgLy8gSGllcmFyY2hpY2FsIHZhbHVlIHNlbGVjdGlvblxyXG4gICAgICAgICAgaWYgKHNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvbkNyaXRlcmlhVHlwZS5IaWVyYXJjaGljYWxUeXBlKSB7XHJcbiAgICAgICAgICAgIGxldCBoaWVyTW9kZWw6IEhpZXJhcmNoaWNhbFNlbGVjdGlvbk1vZGVsID0gPEhpZXJhcmNoaWNhbFNlbGVjdGlvbk1vZGVsPiB0aGlzLmFkZFRvUGFyYW1zTGlzdChzdC5maWVsZE5hbWUsIHN0LnZhbHVlKTtcclxuICAgICAgICAgICAgc2VsZWN0aW9uTW9kZWxDb250YWluZXIuaGllck1vZGVsQXJyLnB1c2goaGllck1vZGVsKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1peGVkU2VsZWN0aW9uc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICgoPENvbnRyYWN0LlJhbmdlVmFsdWU+IHJhbmdlT3B0aW9uKS5taW4gIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgJiYgKDxDb250cmFjdC5SYW5nZVZhbHVlPiByYW5nZU9wdGlvbikubWF4ICE9PSB1bmRlZmluZWQpIHsgLy8gUmFuZ2UgdmFsdWUgc2VsZWN0aW9uXHJcbiAgICAgICAgICBpZiAoc2VsZWN0aW9uVHlwZSA9PT0gU2VsZWN0aW9uQ3JpdGVyaWFUeXBlLlJhbmdlVHlwZSkge1xyXG4gICAgICAgICAgICBsZXQgcXVhbnRNb2RlbDogUmFuZ2VTZWxlY3Rpb25Nb2RlbCA9IHRoaXMuYWRkVG9SYW5nZVBhcmFtc0xpc3Qoc3QuZmllbGROYW1lLCByYW5nZU9wdGlvbik7XHJcbiAgICAgICAgICAgIHNlbGVjdGlvbk1vZGVsQ29udGFpbmVyLnF1YW50TW9kZWxBcnIucHVzaChxdWFudE1vZGVsKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1peGVkU2VsZWN0aW9uc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHsgLy8gRGltZW5zaW9uIHZhbHVlIHNlbGVjdGlvblxyXG4gICAgICAgICAgaWYgKHNlbGVjdGlvblR5cGUgPT09IFNlbGVjdGlvbkNyaXRlcmlhVHlwZS5EaW1lbnNpb25UeXBlKSB7XHJcbiAgICAgICAgICAgIGxldCBkaW1Nb2RlbDogRGltZW5zaW9uU2VsZWN0aW9uTW9kZWwgPSA8RGltZW5zaW9uU2VsZWN0aW9uTW9kZWw+IHRoaXMuYWRkVG9QYXJhbXNMaXN0KHN0LmZpZWxkTmFtZSwgc3QudmFsdWUpO1xyXG4gICAgICAgICAgICBzZWxlY3Rpb25Nb2RlbENvbnRhaW5lci5kaW1Nb2RlbEFyci5wdXNoKGRpbU1vZGVsKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1peGVkU2VsZWN0aW9uc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1peGVkU2VsZWN0aW9uc0Vycm9yKSB7XHJcbiAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uaW52YWxpZChbJ1NlbGVjdGlvbiBDcml0ZXJpYScsICdEaWZmZXJlbnQgdHlwZXMgb2Ygc2VsZWN0aW9uIGNyaXRlcmlhcyBwcm92aWRlZC4nXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VsZWN0aW9uTW9kZWxDb250YWluZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBzZWxlY3Rpb25Dcml0ZXJpYXMgVmFsaWRhdGUgYW5kIGRldGVybWluZSB0aGUgc2VsZWN0aW9uIGNyaXRlcmlhcyB0eXBlLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdmFsaWRhdGVTZWxlY3Rpb25Dcml0ZXJpYShzZWxlY3Rpb25Dcml0ZXJpYTogQ29udHJhY3QuU2VsZWN0aW9uQ3JpdGVyaWEpOiBTZWxlY3Rpb25Dcml0ZXJpYVR5cGUge1xyXG4gICAgbGV0IHNlbGVjdGlvblR5cGU6IFNlbGVjdGlvbkNyaXRlcmlhVHlwZTtcclxuICAgIC8vIERldGVybWluZSB0aGUgdHlwZSBvZiBzZWxlY3Rpb24sIHRoaXMgY29tbWFuZCBpcyBieSBsb29raW5nIGF0IHRoZSBmaXJzdCBzZWxlY3Rpb25cclxuICAgIGxldCBjcml0OiBDb250cmFjdC5TZWxlY3Rpb25Dcml0ZXJpYSA9IHNlbGVjdGlvbkNyaXRlcmlhO1xyXG5cclxuICAgIGxldCBjYXRSZWdleCA9IG5ldyBSZWdFeHAoJyhcXFtbQS1aYS16MC05XStdKS4qJywgJ2cnKTtcclxuICAgIGxldCByYW5nZU9wdGlvbjogQ29udHJhY3QuUmFuZ2VWYWx1ZSA9IGNyaXQudmFsdWUgYXMgQ29udHJhY3QuUmFuZ2VWYWx1ZTtcclxuXHJcbiAgICBpZiAoY3JpdC5maWVsZE5hbWUgJiYgKGNyaXQudmFsdWUgIT09IHVuZGVmaW5lZCAmJiBjcml0LnZhbHVlICE9PSBudWxsKSkge1xyXG4gICAgICBpZiAoY2F0UmVnZXgudGVzdChjcml0LmZpZWxkTmFtZSkpIHsgLy8gSGllcmFyY2hpY2FsIHZhbHVlIHNlbGVjdGlvblxyXG4gICAgICAgIHNlbGVjdGlvblR5cGUgPSBTZWxlY3Rpb25Dcml0ZXJpYVR5cGUuSGllcmFyY2hpY2FsVHlwZTtcclxuICAgICAgfSBlbHNlIGlmICgoPENvbnRyYWN0LlJhbmdlVmFsdWU+IHJhbmdlT3B0aW9uKS5taW4gIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgJiYgKDxDb250cmFjdC5SYW5nZVZhbHVlPiByYW5nZU9wdGlvbikubWF4ICE9PSB1bmRlZmluZWQpIHsgLy8gUmFuZ2UgdmFsdWUgc2VsZWN0aW9uXHJcbiAgICAgICAgc2VsZWN0aW9uVHlwZSA9IFNlbGVjdGlvbkNyaXRlcmlhVHlwZS5SYW5nZVR5cGU7XHJcbiAgICAgIH0gZWxzZSB7IC8vIERpbWVyc2lvbiB2YWx1ZSBzZWxlY3Rpb25cclxuICAgICAgICBzZWxlY3Rpb25UeXBlID0gU2VsZWN0aW9uQ3JpdGVyaWFUeXBlLkRpbWVuc2lvblR5cGU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uaW52YWxpZChbJ1NlbGVjdGlvbicsICdDcml0ZXJpYSBmb3JtYXQuJ10pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlbGVjdGlvblR5cGU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gdHJhbnNmb3JtIHRoZSBrZXkgdmFsdWUgcGFpciBpbnRvIHZhbHVlIGJhc2VkIHByZXMgbW9kZWwgb2JqZWN0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHZhbHVlU2VsZWN0aW9uTW9kZWxcclxuICAgKiBAcGFyYW0gZmllbGROYW1lXHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRUb1BhcmFtc0xpc3QoZmllbGROYW1lOiBzdHJpbmcsIHZhbHVlOiBvYmplY3QpOiBWYWx1ZVNlbGVjdGlvbk1vZGVsIHtcclxuICAgIGxldCB2YWx1ZVNlbGVjdGlvbk1vZGVsOiBWYWx1ZVNlbGVjdGlvbk1vZGVsID0gbmV3IFZhbHVlU2VsZWN0aW9uTW9kZWwoKTtcclxuICAgIGxldCBtYXJrVmFsdWVzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgbGV0IHZhbHVlQXJyOiBBcnJheTxzdHJpbmc+ID0gdmFsdWU7XHJcbiAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHZhbHVlQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbWFya1ZhbHVlcy5wdXNoKHZhbHVlQXJyW2ldLnRvU3RyaW5nKCkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtYXJrVmFsdWVzLnB1c2godmFsdWUudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsdWVTZWxlY3Rpb25Nb2RlbC5xdWFsaWZpZWRGaWVsZENhcHRpb24gPSBmaWVsZE5hbWU7XHJcbiAgICB2YWx1ZVNlbGVjdGlvbk1vZGVsLnNlbGVjdFZhbHVlcyA9IG1hcmtWYWx1ZXM7XHJcbiAgICByZXR1cm4gdmFsdWVTZWxlY3Rpb25Nb2RlbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byB0cmFuc2Zvcm0gdGhlIGtleSB2YWx1ZSBwYWlyIGludG8gcmFuZ2UgYmFzZWQgc2VsZWN0aW9uIHByZXMgbW9kZWwuXHJcbiAgICpcclxuICAgKiBUT0RPOiBOZWVkIHRvIGhhbmRsZSB0aGUgcGFyc2luZyBvZiBkYXRlIHR5cGUgdmFsdWVzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHZhbHVlU2VsZWN0aW9uTW9kZWxcclxuICAgKiBAcGFyYW0gZmllbGROYW1lXHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBhZGRUb1JhbmdlUGFyYW1zTGlzdChmaWVsZE5hbWU6IHN0cmluZywgdmFsdWU6IENvbnRyYWN0LlJhbmdlVmFsdWUpOiBSYW5nZVNlbGVjdGlvbk1vZGVsIHtcclxuICAgIGxldCByYW5nZVNlbGVjdGlvbk1vZGVsOiBSYW5nZVNlbGVjdGlvbk1vZGVsID0gbmV3IFJhbmdlU2VsZWN0aW9uTW9kZWwoKTtcclxuICAgIHJhbmdlU2VsZWN0aW9uTW9kZWwucXVhbGlmaWVkRmllbGRDYXB0aW9uID0gZmllbGROYW1lO1xyXG4gICAgaWYgKHZhbHVlLm1heCAhPT0gdW5kZWZpbmVkICYmIHZhbHVlLm1heCAhPT0gbnVsbCkge1xyXG4gICAgICByYW5nZVNlbGVjdGlvbk1vZGVsLm1heFZhbHVlID0gdmFsdWUubWF4LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodmFsdWUubWluICE9PSB1bmRlZmluZWQgJiYgdmFsdWUubWluICE9PSBudWxsKSB7XHJcbiAgICAgIHJhbmdlU2VsZWN0aW9uTW9kZWwubWluVmFsdWUgPSB2YWx1ZS5taW4udG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIHJhbmdlU2VsZWN0aW9uTW9kZWwuaW5jbHVkZWQgPSB0aGlzLnZhbGlkYXRlTnVsbE9wdGlvblR5cGUodmFsdWUubnVsbE9wdGlvbik7XHJcbiAgICByZXR1cm4gcmFuZ2VTZWxlY3Rpb25Nb2RlbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0byB2YWxpZGF0ZSB0aGUgc2VsZWN0aW9uIHVwZGF0ZSB0eXBlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHNlbGVjdGlvblVwZGF0ZVR5cGVcclxuICAgKi9cclxuICBwcml2YXRlIHZhbGlkYXRlU2VsZWN0aW9uVXBkYXRlVHlwZShzZWxlY3Rpb25VcGRhdGVUeXBlOiBDb250cmFjdC5TZWxlY3Rpb25VcGRhdGVUeXBlKTogc3RyaW5nIHtcclxuICAgIGlmIChzZWxlY3Rpb25VcGRhdGVUeXBlID09PSBDb250cmFjdC5TZWxlY3Rpb25VcGRhdGVUeXBlLlJlcGxhY2UpIHtcclxuICAgICAgcmV0dXJuIFNlbGVjdGlvblVwZGF0ZVR5cGVJbnRlcm5hbC5SZXBsYWNlO1xyXG4gICAgfSBlbHNlIGlmIChzZWxlY3Rpb25VcGRhdGVUeXBlID09PSBDb250cmFjdC5TZWxlY3Rpb25VcGRhdGVUeXBlLkFkZCkge1xyXG4gICAgICByZXR1cm4gU2VsZWN0aW9uVXBkYXRlVHlwZUludGVybmFsLkFkZDtcclxuICAgIH0gZWxzZSBpZiAoc2VsZWN0aW9uVXBkYXRlVHlwZSA9PT0gQ29udHJhY3QuU2VsZWN0aW9uVXBkYXRlVHlwZS5SZW1vdmUpIHtcclxuICAgICAgcmV0dXJuIFNlbGVjdGlvblVwZGF0ZVR5cGVJbnRlcm5hbC5SZW1vdmU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gU2VsZWN0aW9uVXBkYXRlVHlwZUludGVybmFsLlJlcGxhY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdG8gdmFsaWRhdGUgdGhlIGluY2x1ZGUgdHlwZSBmb3IgcmFuZ2Ugc2VsZWN0aW9uLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIG51bGxPcHRpb25cclxuICAgKi9cclxuICBwcml2YXRlIHZhbGlkYXRlTnVsbE9wdGlvblR5cGUobnVsbE9wdGlvbjogQ29udHJhY3QuRmlsdGVyTnVsbE9wdGlvbiB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XHJcbiAgICBpZiAobnVsbE9wdGlvbikge1xyXG4gICAgICBpZiAobnVsbE9wdGlvbiA9PT0gQ29udHJhY3QuRmlsdGVyTnVsbE9wdGlvbi5OdWxsVmFsdWVzKSB7XHJcbiAgICAgICAgcmV0dXJuIFF1YW50aXRhdGl2ZUluY2x1ZGVkVmFsdWVzLkluY2x1ZGVOdWxsO1xyXG4gICAgICB9IGVsc2UgaWYgKG51bGxPcHRpb24gPT09IENvbnRyYWN0LkZpbHRlck51bGxPcHRpb24uTm9uTnVsbFZhbHVlcykge1xyXG4gICAgICAgIHJldHVybiBRdWFudGl0YXRpdmVJbmNsdWRlZFZhbHVlcy5JbmNsdWRlTm9uTnVsbDtcclxuICAgICAgfSBlbHNlIGlmIChudWxsT3B0aW9uID09PSBDb250cmFjdC5GaWx0ZXJOdWxsT3B0aW9uLkFsbFZhbHVlcykge1xyXG4gICAgICAgIHJldHVybiBRdWFudGl0YXRpdmVJbmNsdWRlZFZhbHVlcy5JbmNsdWRlQWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFF1YW50aXRhdGl2ZUluY2x1ZGVkVmFsdWVzLkluY2x1ZGVBbGw7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEVudW0gZm9yIHRoZSBkaWZmZXJlbnQgc2VsZWN0aW9uIGNyaXRlcmlhIHR5cGVzLlxyXG4gKi9cclxuZW51bSBTZWxlY3Rpb25Dcml0ZXJpYVR5cGUge1xyXG4gIEhpZXJhcmNoaWNhbFR5cGUgPSAxLFxyXG4gIFJhbmdlVHlwZSA9IDIsXHJcbiAgRGltZW5zaW9uVHlwZSA9IDMsXHJcbiAgVHVwbGVzVHlwZSA9IDQsXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9TZXJ2aWNlcy9pbXBsL1NlbGVjdGlvblNlcnZpY2VJbXBsLnRzXG4gKiovIiwiLyoqXHJcbiAqIFNlbGVjdGlvbiBNb2RlbC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25Nb2RlbCB7XHJcbiAgcXVhbGlmaWVkRmllbGRDYXB0aW9uOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBWYWx1ZSBiYXNlZCBzZWxlY3Rpb24gbW9kZWwuIE1lYW50IGZvciBoaWVyYXJjaGljYWwsIHJhbmdlIGFuZCBjYXRlZ29yaWNhbCBzZWxlY3Rpb25zLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZhbHVlU2VsZWN0aW9uTW9kZWwgZXh0ZW5kcyBTZWxlY3Rpb25Nb2RlbCB7XHJcbiAgc2VsZWN0VmFsdWVzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIaWVyYXJjaGljYWwgdmFsdWUgc2VsZWN0aW9uIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSGllcmFyY2hpY2FsU2VsZWN0aW9uTW9kZWwgZXh0ZW5kcyBWYWx1ZVNlbGVjdGlvbk1vZGVsIHtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJhbmdlIGJhc2VkIHZhbHVlIHNlbGVjdGlvbiBtb2RlbFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJhbmdlU2VsZWN0aW9uTW9kZWwgZXh0ZW5kcyBTZWxlY3Rpb25Nb2RlbCB7XHJcbiAgbWluVmFsdWU6IHN0cmluZztcclxuICBtYXhWYWx1ZTogc3RyaW5nO1xyXG4gIGluY2x1ZGVkOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBEaW1lbnNpb24gdmFsdWUgc2VsZWN0aW9uIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgRGltZW5zaW9uU2VsZWN0aW9uTW9kZWwgZXh0ZW5kcyBWYWx1ZVNlbGVjdGlvbk1vZGVsIHtcclxufVxyXG4vKipcclxuICogVHVwbGUgYmFzZWQgc2VsZWN0aW9uIG1vZGVsXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVHVwbGVTZWxlY3Rpb25Nb2RlbCB7XHJcbiAgc2VsZWN0aW9uVHlwZTogc3RyaW5nO1xyXG4gIG9iamVjdElkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIGNsYXNzIHRvIHBvcHVsYXRlIGFsbCB0aGUgc2VsZWN0aW9uIG1vZGVscyB3aGVuIHBhcnNpbmcgaW5wdXRcclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb25Nb2RlbHNDb250YWluZXIge1xyXG4gIGhpZXJNb2RlbEFycjogQXJyYXk8SGllcmFyY2hpY2FsU2VsZWN0aW9uTW9kZWw+ID0gW107XHJcbiAgZGltTW9kZWxBcnI6IEFycmF5PERpbWVuc2lvblNlbGVjdGlvbk1vZGVsPiA9IFtdO1xyXG4gIHF1YW50TW9kZWxBcnI6IEFycmF5PFJhbmdlU2VsZWN0aW9uTW9kZWw+ID0gW107XHJcbiAgc2VsZWN0aW9uOiBUdXBsZVNlbGVjdGlvbk1vZGVsO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvTW9kZWxzL1NlbGVjdGlvbk1vZGVscy50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7XHJcbiAgQ29tbWFuZFJlc3BvbnNlTWVzc2FnZSxcclxuICBDcm9zc0ZyYW1lTWVzc2VuZ2VyLFxyXG4gIFZFUlNJT04gYXMgQXBpTWVzc2FnaW5nVmVyc2lvbixcclxufSBmcm9tICdAdGFibGVhdS9hcGktbWVzc2FnaW5nJztcclxuXHJcbmltcG9ydCB7IENyb3NzRnJhbWVEaXNwYXRjaGVyIH0gZnJvbSAnLi9Dcm9zc0ZyYW1lRGlzcGF0Y2hlcic7XHJcblxyXG4vLyBDaGVja3MgdG8gc2VlIGlmIHdlIGFyZSBydW5uaW5nIGluIGFuIGlmcmFtZSBjdXJyZW50bHk6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zMjYwNzYvODgyMTE1M1xyXG5mdW5jdGlvbiBpbklmcmFtZSh0aGlzV2luZG93OiBXaW5kb3cpOiBib29sZWFuIHtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIHRoaXNXaW5kb3cuc2VsZiAhPT0gdGhpc1dpbmRvdy5wYXJlbnQ7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQXR0ZW1wdHMgdG8gYm9vdHN0cmFwIHRoZSBleHRlbnNpb24gd2l0aCBhIGNyb3NzLWZyYW1lIHBhcmVudCB3aGVyZSBUYWJsZWF1IGlzIHJ1bm5pbmdcclxuICpcclxuICogQHBhcmFtIHRoaXNXaW5kb3cgVGhlIHdpbmRvdyB3aGljaCB3ZSBhcmUgcnVubmluZyBpbiAoaW5qZWN0ZWQgZm9yIHVuaXQgdGVzdGluZyBwdXJwb3NlcylcclxuICogQHBhcmFtIHZlcnNpb25OdW1iZXIgVGhlIHZlcnNpb24gbnVtYmVyIG9mIG91ciBBUEkgdG8gaW5jbHVkZSBpbiB0aGUgaW5pdGlhbGl6YXRpb24gbWVzc2FnZVxyXG4gKiBAcmV0dXJucyBBIHByb21pc2Ugd2hpY2ggaXMgZG9pbmcgdGhlIGFjdHVhbCBib290c3RyYXBwaW5nXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZG9Dcm9zc0ZyYW1lQm9vdHN0cmFwKHRoaXNXaW5kb3c6IFdpbmRvdywgdmVyc2lvbk51bWJlcjogQ29udHJhY3QuVmVyc2lvbk51bWJlcik6IFByb21pc2U8Q29udHJhY3QuSW50ZXJuYWxBcGlEaXNwYXRjaGVyPiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlPENvbnRyYWN0LkludGVybmFsQXBpRGlzcGF0Y2hlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgIC8vIENoZWNrIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiBhbiBpZnJhbWUgYW5kIGhhdmUgYSBwYXJlbnQgdG8gY29tbXVuaWNhdGUgd2l0aFxyXG4gICAgaWYgKCFpbklmcmFtZSh0aGlzV2luZG93KSkge1xyXG4gICAgICByZWplY3QoJ1RoaXMgZXh0ZW5zaW9uIGlzIG5vdCBydW5uaW5nIGluc2lkZSBhbiBpZnJhbWUgb3IgZGVza3RvcC4gSW5pdGlhbGl6YXRpb24gZmFpbGVkLicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENyZWF0ZSB0aGUgbWVzc2VuZ2VyIHdoaWNoIHdpbGwgZG8gaGUgY29tbXVuaWNhdGlvbiBiZXR3ZWVuIHRoaXMgd2luZG93IGFuZCBvdXIgcGFyZW50XHJcbiAgICAvLyBTaW5jZSB3ZSBkb24ndCBrbm93IHdoZXJlIHdlIGFyZSBydW5uaW5nIHlldCwgd2UgaGF2ZSB0byBtYWtlIHRoaXMgaW5pdGlhbCBvcmlnaW4gJyonLiBPbmNlXHJcbiAgICAvLyB3ZSBoYXZlIHN1Y2Nlc3NmdWxseSBpbml0aWFsaXplZCBvdXIgZXh0ZW5zaW9uLCB3ZSB3aWxsIGxpbWl0IHdoZXJlIHdlIHNlbmQgbWVzc2FnZXNcclxuICAgIGNvbnN0IG1lc3NlbmdlciA9IG5ldyBDcm9zc0ZyYW1lTWVzc2VuZ2VyKHRoaXNXaW5kb3csIHRoaXNXaW5kb3cucGFyZW50LCAnKicpO1xyXG5cclxuICAgIC8vIFByZXBhcmUgdG8gc2VuZCBhbiBpbml0aWFsaXphdGlvbiBtZXNzYWdlIHRvIHRoZSBwYXJlbnQgZnJhbWVcclxuICAgIGNvbnN0IGluaXRpYWxpemF0aW9uTWVzc2FnZSA9IG1lc3Nlbmdlci5wcmVwYXJlSW5pdGlhbGl6YXRpb25NZXNzYWdlKHZlcnNpb25OdW1iZXIsIEFwaU1lc3NhZ2luZ1ZlcnNpb24pO1xyXG5cclxuICAgIC8vIFdoZW4gd2UgcmVjZWl2ZSBhIHJlc3BvbnNlIGJhY2sgZnJvbSB0aGUgcGFyZW50LCB3ZSBjaGVjayB0byBtYWtlIHN1cmUgdGhlIGd1aWRzIG1hdGNoIGFuZCB0aGVuIHdlIGtub3dcclxuICAgIC8vIHRoYXQgdGhlIHBhcmVudCBpcyBhd2FyZSBvZiB1cyBhbmQgd2UgY2FuIHN0YXJ0IGNvbW11bmljYXRpbmdcclxuICAgIG1lc3Nlbmdlci5zZXRDb21tYW5kUmVzcG9uc2VNZXNzYWdlSGFuZGxlcihmdW5jdGlvbihtc2c6IENvbW1hbmRSZXNwb25zZU1lc3NhZ2UpOiB2b2lkIHtcclxuXHJcbiAgICAgIC8vIFZlcmlmeSB3ZSBhcmUgZ2V0dGluZyBhIHJlc3BvbnNlIGZyb20gb3VyIGluaXRpYWxpemUgbWVzc2FnZVxyXG4gICAgICBpZiAobXNnLmNvbW1hbmRHdWlkID09PSBpbml0aWFsaXphdGlvbk1lc3NhZ2UubWVzc2FnZUd1aWQpIHtcclxuICAgICAgICBjb25zdCBkaXNwYXRjaGVyID0gbmV3IENyb3NzRnJhbWVEaXNwYXRjaGVyKG1lc3Nlbmdlcik7XHJcbiAgICAgICAgcmVzb2x2ZShkaXNwYXRjaGVyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTm93IHRoYXQgb3VyIGhhbmRsZXJzIGFyZSByZWFkeSwgc3RhcnQgbGlzdGVuaW5nIGFuZCBzZW5kIG91ciBpbml0aWFsaXphdGlvbiBtZXNzYWdlXHJcbiAgICBtZXNzZW5nZXIuc3RhcnRMaXN0ZW5pbmcoKTtcclxuICAgIGluaXRpYWxpemF0aW9uTWVzc2FnZS5zZW5kKCk7XHJcbiAgfSk7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9Dcm9zc0ZyYW1lL0Nyb3NzRnJhbWVCb290c3RyYXAudHNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyB5b3VyIG1haW4uIFRoaXMgaXMgd2hlcmUgeW91IHJlLWV4cG9ydCBldmVyeXRoaW5nIHlvdSB3YW50IHRvIGJlIHB1YmxpY2x5IGF2YWlsYWJsZS5cclxuICpcclxuICogVGhlIGJ1aWxkIGVuZm9yY2VzIHRoYXQgdGhlIGZpbGUgaGFzIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGdsb2JhbCB2YXJpYWJsZSB0aGF0IGlzIGV4cG9ydGVkLlxyXG4gKi9cclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vQ3Jvc3NGcmFtZU1lc3Nlbmdlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL01lc3NhZ2VEaXNwYXRjaGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvTWVzc2FnZUxpc3RlbmVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvTWVzc2FnZVR5cGVzJztcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvTWVzc2VuZ2VyJztcclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvUHJlcGFyZWRNZXNzYWdlJztcclxuXHJcbi8vIEV4cG9ydCB0aGUgdmVyc2lvbiBudW1iZXIgb2YgbWVzc2FnaW5nIGZvciBjb25zdW1lcnMgdG8gdXNlLlxyXG4vLyBCZSB2ZXJ5IGNhcmVmdWwgbWFraW5nIGFueSB1cGRhdGVzIHRvIHRoaXMgY29udHJhY3Qgd2hpY2ggYnJlYWsgdmVyc2lvbiBjb21wYXRpYmlsaXR5LlxyXG5leHBvcnQgY29uc3QgVkVSU0lPTiA9IHtcclxuICBtYWpvcjogMSxcclxuICBtaW5vcjogMCxcclxuICBmaXg6IDBcclxufTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L2pzLWFwaS9hcGktbWVzc2FnaW5nL3NyYy9BcGlNZXNzYWdpbmcudHNcbiAqKi8iLCJpbXBvcnQgeyBFeGVjdXRlUGFyYW1ldGVycywgTW9kZWwsIE5vdGlmaWNhdGlvbklkLCBWZXJiSWQsIFZlcnNpb25OdW1iZXIgfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBHdWlkIH0gZnJvbSAnQHRhYmxlYXUvZ3VpZCc7XHJcblxyXG5pbXBvcnQgeyBDcm9zc0ZyYW1lUHJlcGFyZWRNZXNzYWdlIH0gZnJvbSAnLi9Dcm9zc0ZyYW1lUHJlcGFyZWRNZXNzYWdlJztcclxuaW1wb3J0IHtcclxuICBDb21tYW5kTWVzc2FnZSxcclxuICBDb21tYW5kUmVzcG9uc2VNZXNzYWdlLFxyXG4gIEluaXRpYWxpemVNZXNzYWdlLFxyXG4gIE1lc3NhZ2UsXHJcbiAgTWVzc2FnZVR5cGUsXHJcbiAgTm90aWZpY2F0aW9uTWVzc2FnZSxcclxufSBmcm9tICcuL2ludGVyZmFjZS9NZXNzYWdlVHlwZXMnO1xyXG5pbXBvcnQgeyBNZXNzZW5nZXIgfSBmcm9tICcuL2ludGVyZmFjZS9NZXNzZW5nZXInO1xyXG5pbXBvcnQgeyBQcmVwYXJlZE1lc3NhZ2UgfSBmcm9tICcuL2ludGVyZmFjZS9QcmVwYXJlZE1lc3NhZ2UnO1xyXG5pbXBvcnQge1xyXG4gIGlzQ29tbWFuZE1lc3NhZ2UsXHJcbiAgaXNDb21tYW5kUmVzcG9uc2VNZXNzYWdlLFxyXG4gIGlzSW5pdE1lc3NhZ2UsXHJcbiAgaXNNZXNzYWdlLFxyXG4gIGlzTm90aWZpY2F0aW9uTWVzc2FnZSxcclxufSBmcm9tICcuL01lc3NhZ2VUeXBlQ2hlY2tzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgQ3Jvc3NGcmFtZU1lc3NlbmdlciBpcyB0aGUgcHJpbWFyeSBleHBvcnQgZnJvbSB0aGUgYXBpLW1lc3NhZ2luZyBtb2R1bGUuIEFuIGluc3RhbmNlIG9mXHJcbiAqIHRoaXMgY2xhc3MgY2FuIGJlIGluc3RhbnRpYXRlZCBvbiBib3RoIHNpZGVzIG9mIGEgZnJhbWUgYm91bmRhcnkgdG8gZmFjaWxpdGF0ZSBjb21tdW5pY2F0aW9uXHJcbiAqIGluIGJvdGggZGlyZWN0aW9ucyBiZXR3ZWVuIHRoZSBmcmFtZXMuIFRoaXMgY2xhc3MgaW1wbGVtZW50cyBib3RoIHRoZSBkaXNwYXRjaGVyIGFuZCB0aGUgbGlzdGVuZXJcclxuICogcG9ydGlvbnMsIGJ1dCBkb2Vzbid0IHJlcXVpcmUgY2FsbGVycyB0byBjYXJlIGFib3V0IGJvdGguXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ3Jvc3NGcmFtZU1lc3NlbmdlciBpbXBsZW1lbnRzIE1lc3NlbmdlciB7XHJcbiAgcHJpdmF0ZSB1bnJlZ2lzdGVyRnVuY3Rpb246IHVuZGVmaW5lZCB8ICgoKSA9PiB2b2lkKTtcclxuICBwcml2YXRlIGluaXRpYWxpemVNZXNzYWdlSGFuZGxlcjogdW5kZWZpbmVkIHwgKChtc2c6IEluaXRpYWxpemVNZXNzYWdlLCBzb3VyY2U6IFdpbmRvdykgPT4gdm9pZCk7XHJcbiAgcHJpdmF0ZSBjb21tYW5kUmVzcG9uc2VNZXNzYWdlSGFuZGxlcjogdW5kZWZpbmVkIHwgKChtc2c6IENvbW1hbmRSZXNwb25zZU1lc3NhZ2UsIHNvdXJjZTogV2luZG93KSA9PiB2b2lkKTtcclxuICBwcml2YXRlIGNvbW1hbmRNZXNzYWdlSGFuZGxlcjogdW5kZWZpbmVkIHwgKChtc2c6IENvbW1hbmRNZXNzYWdlLCBzb3VyY2U6IFdpbmRvdykgPT4gdm9pZCk7XHJcbiAgcHJpdmF0ZSBub3RpZmljYXRpb25NZXNzYWdlSGFuZGxlcjogdW5kZWZpbmVkIHwgKChtc2c6IE5vdGlmaWNhdGlvbk1lc3NhZ2UsIHNvdXJjZTogV2luZG93KSA9PiB2b2lkKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDcm9zc0ZyYW1lTWVzc2VuZ2VyLiBJZiB5b3Ugd291bGQgbGlrZSB0byB1c2UgdGhlIENyb3NzRnJhbWVNZXNzZW5nZXIgYXMgYSBNZXNzYWdlTGlzdGVuZXIsXHJcbiAgICogYmUgc3VyZSB0byBjYWxsIFN0YXJ0TGlzdGVuaW5nIGFuZCByZWdpc3RlciBtZXNzYWdlIGhhbmRsZXJzLlxyXG4gICAqIEBwYXJhbSB0aGlzV2luZG93IFRoZSB3aW5kb3cgb2JqZWN0IHdoaWNoIHRoZSBDcm9zc0ZyYW1lTWVzc2VuZ2VyIGxpdmVzLiBBbiBvbk1lc3NhZ2UgbGlzdGVuZXIgd2lsbCBiZSBhZGRlZCBoZXJlLlxyXG4gICAqIEBwYXJhbSBbb3RoZXJXaW5kb3ddIE9wdGlvbmFsIG90aGVyV2luZG93IHdoaWNoIG1lc3NhZ2VzIHdpbGwgYmUgcG9zdGVkIHRvLlxyXG4gICAqICAgICAgICAgICAgICAgICAgICAgIElmIGRlZmluZWQsIGluY29taW5nIG1lc3NhZ2VzIG11c3Qgb3JpZ2luYXRlIGZyb20gb3RoZXJXaW5kb3cgdG8gYmUgcGFzc2VkIG9uXHJcbiAgICogQHBhcmFtIFtvdGhlcldpbmRvd09yaWdpbl0gVGhlIHRhcmdldCBvcmlnaW4gd2hpY2ggb3RoZXJXaW5kb3cgbXVzdCBoYXZlIGluIG9yZGVyIHRvIHJlY2VpdmUgZGlzcGF0Y2hlZCBtZXNzYWdlcy5cclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIHZhbHVlIHdpbGwgYmUgc2VudCBhcyB0aGUgdGFyZ2V0T3JpZ2luIG9mIGEgcG9zdE1lc3NhZ2VcclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvdy9wb3N0TWVzc2FnZSlcclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSB0aGlzV2luZG93OiBXaW5kb3csIHByaXZhdGUgb3RoZXJXaW5kb3c/OiBXaW5kb3csIHByaXZhdGUgb3RoZXJXaW5kb3dPcmlnaW4/OiBzdHJpbmcpIHtcclxuICAgIC8vIE1ha2Ugc3VyZSB0byBjYWxsIFN0YXJ0TGlzdGVuaW5nXHJcbiAgfVxyXG5cclxuICAvLy8vLyBNZXNzYWdlTGlzdGVuZXIgSW1wbGVtZW50YXRpb25cclxuXHJcbiAgcHVibGljIHN0YXJ0TGlzdGVuaW5nKCk6IHZvaWQge1xyXG4gICAgLy8gQ2hlY2sgaWYgd2UgYWxyZWFkeSBhcmUgbGlzdGVuaW5nLCBpZiBub3QsIGhvb2sgdXAgYSBtZXNzYWdlIGxpc3RlbmVyXHJcbiAgICBpZiAoIXRoaXMudW5yZWdpc3RlckZ1bmN0aW9uKSB7XHJcbiAgICAgIGNvbnN0IGJvdW5kSGFuZGxlciA9IHRoaXMub25NZXNzYWdlUmVjZWl2ZWQuYmluZCh0aGlzKTtcclxuICAgICAgdGhpcy50aGlzV2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBib3VuZEhhbmRsZXIsIHRydWUpO1xyXG4gICAgICB0aGlzLnVucmVnaXN0ZXJGdW5jdGlvbiA9ICgpID0+IHRoaXMudGhpc1dpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgYm91bmRIYW5kbGVyLCB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdG9wTGlzdGVuaW5nKCk6IHZvaWQge1xyXG4gICAgLy8gU3RvcCBsaXN0ZW5pbmcgaWYgd2UgaGF2ZSBzdGFydGVkIGxpc3RlbmluZ1xyXG4gICAgaWYgKHRoaXMudW5yZWdpc3RlckZ1bmN0aW9uKSB7XHJcbiAgICAgIHRoaXMudW5yZWdpc3RlckZ1bmN0aW9uKCk7XHJcbiAgICAgIHRoaXMudW5yZWdpc3RlckZ1bmN0aW9uID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldEluaXRpYWxpemVNZXNzYWdlSGFuZGxlcihoYW5kbGVyPzogKG1zZzogSW5pdGlhbGl6ZU1lc3NhZ2UsIHNvdXJjZTogV2luZG93KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLmluaXRpYWxpemVNZXNzYWdlSGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0Q29tbWFuZFJlc3BvbnNlTWVzc2FnZUhhbmRsZXIoaGFuZGxlcj86IChtc2c6IENvbW1hbmRSZXNwb25zZU1lc3NhZ2UsIHNvdXJjZTogV2luZG93KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLmNvbW1hbmRSZXNwb25zZU1lc3NhZ2VIYW5kbGVyID0gaGFuZGxlcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRDb21tYW5kTWVzc2FnZUhhbmRsZXIoaGFuZGxlcj86IChtc2c6IENvbW1hbmRNZXNzYWdlLCBzb3VyY2U6IFdpbmRvdykgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5jb21tYW5kTWVzc2FnZUhhbmRsZXIgPSBoYW5kbGVyO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldE5vdGlmaWNhdGlvbk1lc3NhZ2VIYW5kbGVyKGhhbmRsZXI/OiAobXNnOiBOb3RpZmljYXRpb25NZXNzYWdlLCBzb3VyY2U6IFdpbmRvdykgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5ub3RpZmljYXRpb25NZXNzYWdlSGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgfVxyXG5cclxuICAvLy8vLyBNZXNzYWdlRGlzcGF0Y2hlciBJbXBsZW1lbnRhdGlvblxyXG5cclxuICBwdWJsaWMgcHJlcGFyZUluaXRpYWxpemF0aW9uTWVzc2FnZShhcGlWZXJzaW9uOiBWZXJzaW9uTnVtYmVyLCBjcm9zc0ZyYW1lVmVyc2lvbjogVmVyc2lvbk51bWJlcik6IFByZXBhcmVkTWVzc2FnZSB7XHJcbiAgICBjb25zdCBtZXNzYWdlOiBJbml0aWFsaXplTWVzc2FnZSA9IHtcclxuICAgICAgbXNnR3VpZDogR3VpZC5jcmVhdGUoKS5mb3JtYXR0ZWRWYWx1ZSxcclxuICAgICAgbXNnVHlwZTogTWVzc2FnZVR5cGUuSW5pdGlhbGl6ZSxcclxuICAgICAgY3Jvc3NGcmFtZVZlcnNpb246IGNyb3NzRnJhbWVWZXJzaW9uLFxyXG4gICAgICBhcGlWZXJzaW9uOiBhcGlWZXJzaW9uXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGlzLnByZXBhcmVNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHByZXBhcmVDb21tYW5kTWVzc2FnZSh2ZXJiSWQ6IFZlcmJJZCwgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMpOiBQcmVwYXJlZE1lc3NhZ2Uge1xyXG4gICAgY29uc3QgbWVzc2FnZTogQ29tbWFuZE1lc3NhZ2UgPSB7XHJcbiAgICAgIG1zZ0d1aWQ6IEd1aWQuY3JlYXRlKCkuZm9ybWF0dGVkVmFsdWUsXHJcbiAgICAgIG1zZ1R5cGU6IE1lc3NhZ2VUeXBlLkNvbW1hbmQsXHJcbiAgICAgIHZlcmJJZDogdmVyYklkLFxyXG4gICAgICBwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGlzLnByZXBhcmVNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHByZXBhcmVDb21tYW5kUmVzcG9uc2VNZXNzYWdlKGNvbW1hbmRHdWlkOiBzdHJpbmcsIGRhdGE6IE1vZGVsIHwgdW5kZWZpbmVkLCBlcnJvcjogTW9kZWwgfCB1bmRlZmluZWQpOiBQcmVwYXJlZE1lc3NhZ2Uge1xyXG4gICAgY29uc3QgbWVzc2FnZTogQ29tbWFuZFJlc3BvbnNlTWVzc2FnZSA9IHtcclxuICAgICAgbXNnR3VpZDogR3VpZC5jcmVhdGUoKS5mb3JtYXR0ZWRWYWx1ZSxcclxuICAgICAgbXNnVHlwZTogTWVzc2FnZVR5cGUuQ29tbWFuZFJlc3BvbnNlLFxyXG4gICAgICBjb21tYW5kR3VpZDogY29tbWFuZEd1aWQsXHJcbiAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgIGVycm9yOiBlcnJvclxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5wcmVwYXJlTWVzc2FnZShtZXNzYWdlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBwcmVwYXJlTm90aWZpY2F0aW9uTWVzc2FnZShub3RpZmljYXRpb25JZDogTm90aWZpY2F0aW9uSWQsIGRhdGE6IE1vZGVsKTogUHJlcGFyZWRNZXNzYWdlIHtcclxuICAgIGNvbnN0IG1lc3NhZ2U6IE5vdGlmaWNhdGlvbk1lc3NhZ2UgPSB7XHJcbiAgICAgIG1zZ0d1aWQ6IEd1aWQuY3JlYXRlKCkuZm9ybWF0dGVkVmFsdWUsXHJcbiAgICAgIG1zZ1R5cGU6IE1lc3NhZ2VUeXBlLk5vdGlmaWNhdGlvbixcclxuICAgICAgbm90aWZpY2F0aW9uSWQ6IG5vdGlmaWNhdGlvbklkLFxyXG4gICAgICBkYXRhOiBkYXRhXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGlzLnByZXBhcmVNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJlcGFyZXMgYSBwZW5kaW5nIG1lc3NhZ2UgZm9yIHNlbmRpbmcgYW5kIHJldHVybnMgdGhlIHByZXBhcmVkIG1lc3NhZ2VcclxuICAgKlxyXG4gICAqIEBwYXJhbSBtc2cgVGhlIG1lc3NhZ2UgdG8gYmUgc2VudCB0byB0aGlzLm90aGVyV2luZG93XHJcbiAgICogQHJldHVybnMgVGhlIHByZXBhcmVkIG1lc3NhZ2VcclxuICAgKi9cclxuICBwcml2YXRlIHByZXBhcmVNZXNzYWdlKG1zZzogTWVzc2FnZSk6IFByZXBhcmVkTWVzc2FnZSB7XHJcbiAgICBpZiAoIXRoaXMub3RoZXJXaW5kb3cgfHwgIXRoaXMub3RoZXJXaW5kb3dPcmlnaW4pIHtcclxuICAgICAgdGhyb3cgJ090aGVyIHdpbmRvdyBub3QgaW5pdGlhbGl6ZWQsIGNhbm5vdCBkaXNwYXRjaCBtZXNzYWdlcyc7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJlcGFyZWRNZXNzYWdlID0gbmV3IENyb3NzRnJhbWVQcmVwYXJlZE1lc3NhZ2UobXNnLCB0aGlzLm90aGVyV2luZG93LCB0aGlzLm90aGVyV2luZG93T3JpZ2luKTtcclxuICAgIHJldHVybiBwcmVwYXJlZE1lc3NhZ2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhIG1lc3NhZ2UgaXMgcmVjZWl2ZWQuIERvZXMgc29tZSB2YWxpZGF0aW9uIG9mIHRoZSBtZXNzYWdlLCBhbmQgdGhlblxyXG4gICAqIGNhbGxzIGFuIGFwcHJvcHJpYXRlIG1lc3NhZ2UgaGFuZGxlciBpZiBvbmUgaXMgZGVmaW5lZFxyXG4gICAqXHJcbiAgICogQHBhcmFtIGV2ZW50IFRoZSBpbmNvbWluZyBNZXNzYWdlRXZlbnRcclxuICAgKi9cclxuICBwcml2YXRlIG9uTWVzc2FnZVJlY2VpdmVkKGV2ZW50OiBNZXNzYWdlRXZlbnQpOiB2b2lkIHtcclxuXHJcbiAgICAvLyBJZiB3ZSBoYXZlIGFuIG90aGVyV2luZG93IGRlZmluZWQsIG1ha2Ugc3VyZSB0aGUgbWVzc2FnZSBpcyBjb21pbmcgZnJvbSB0aGVyZVxyXG4gICAgaWYgKHRoaXMub3RoZXJXaW5kb3cgJiYgZXZlbnQuc291cmNlICE9PSB0aGlzLm90aGVyV2luZG93KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEbyBzb21lIHZhbGlkYXRpb24gb24gZXZlbnQuZGF0YSB0byBtYWtlIHN1cmUgdGhhdCB3ZSBoYXZlIHJlY2VpdmVkIGEgcmVhbCBtZXNzYWdlXHJcbiAgICBpZiAoIWV2ZW50LmRhdGEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5kYXRhO1xyXG4gICAgaWYgKCFpc01lc3NhZ2UobWVzc2FnZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIHRoZSBkZWNsYXJlZCBtZXNzYWdlIHR5cGUsIHZhbGlkYXRlIHRoZSBtZXNzYWdlLCBhbmQgY2FsbCBhbiBhcHByb3ByaWF0ZSBoYW5kZXIgaWYgb25lIGV4aXN0c1xyXG4gICAgc3dpdGNoIChtZXNzYWdlLm1zZ1R5cGUpIHtcclxuICAgICAgY2FzZSBNZXNzYWdlVHlwZS5Jbml0aWFsaXplOiB7XHJcbiAgICAgICAgaWYgKCFpc0luaXRNZXNzYWdlKG1lc3NhZ2UpIHx8ICF0aGlzLmluaXRpYWxpemVNZXNzYWdlSGFuZGxlcikge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplTWVzc2FnZUhhbmRsZXIobWVzc2FnZSwgZXZlbnQuc291cmNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIE1lc3NhZ2VUeXBlLkNvbW1hbmRSZXNwb25zZToge1xyXG4gICAgICAgIGlmICghaXNDb21tYW5kUmVzcG9uc2VNZXNzYWdlKG1lc3NhZ2UpIHx8ICF0aGlzLmNvbW1hbmRSZXNwb25zZU1lc3NhZ2VIYW5kbGVyKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbW1hbmRSZXNwb25zZU1lc3NhZ2VIYW5kbGVyKG1lc3NhZ2UsIGV2ZW50LnNvdXJjZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY2FzZSBNZXNzYWdlVHlwZS5Db21tYW5kOiB7XHJcbiAgICAgICAgaWYgKCFpc0NvbW1hbmRNZXNzYWdlKG1lc3NhZ2UpIHx8ICF0aGlzLmNvbW1hbmRNZXNzYWdlSGFuZGxlcikge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb21tYW5kTWVzc2FnZUhhbmRsZXIobWVzc2FnZSwgZXZlbnQuc291cmNlKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlIE1lc3NhZ2VUeXBlLk5vdGlmaWNhdGlvbjoge1xyXG4gICAgICAgIGlmICghaXNOb3RpZmljYXRpb25NZXNzYWdlKG1lc3NhZ2UpIHx8ICF0aGlzLm5vdGlmaWNhdGlvbk1lc3NhZ2VIYW5kbGVyKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbk1lc3NhZ2VIYW5kbGVyKG1lc3NhZ2UsIGV2ZW50LnNvdXJjZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBKdXN0IGlnbm9yZSB0aGlzIHNpbmNlIHdlIGRvbid0IGtub3cgaG93IHRvIGhhbmRsZSB0aGUgbWVzc2FnZSB0eXBlXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLW1lc3NhZ2luZy9zcmMvQ3Jvc3NGcmFtZU1lc3Nlbmdlci50c1xuICoqLyIsIm51bGxcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvR3VpZC50c1xuICoqLyIsImltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuL2ludGVyZmFjZS9NZXNzYWdlVHlwZXMnO1xyXG5pbXBvcnQgeyBQcmVwYXJlZE1lc3NhZ2UgfSBmcm9tICcuL2ludGVyZmFjZS9QcmVwYXJlZE1lc3NhZ2UnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBQcmVwYXJlZE1lc3NhZ2UgaW50ZXJmYWNlIHVzZWQgdG8gcG9zdCBtZXNzYWdlcyBiZXR3ZWVuXHJcbiAqIHR3byBmcmFtZXMgdXNpbmcgd2luZG93LnBvc3RNZXNzYWdlXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ3Jvc3NGcmFtZVByZXBhcmVkTWVzc2FnZSBpbXBsZW1lbnRzIFByZXBhcmVkTWVzc2FnZSB7XHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBDcm9zc0ZyYW1lUHJlcGFyZWRNZXNzYWdlLlxyXG4gICAqIEBwYXJhbSBfbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBiZSBzZW50XHJcbiAgICogQHBhcmFtIF90YXJnZXQgVGhlIHRhcmdldCB3aW5kb3cgd2hlcmUgdGhlIG1lc3NhZ2Ugd2lsbCBiZSBzZW50XHJcbiAgICogQHBhcmFtIF9vcmlnaW4gVGhlIHRhcmdldE9yaWdpbiB3aGVyZSB0aGlzIG1lc3NhZ2UgY2FuIGJlIHJlY2VpdmVkXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX21lc3NhZ2U6IE1lc3NhZ2UsIHByaXZhdGUgX3RhcmdldDogV2luZG93LCBwcml2YXRlIF9vcmlnaW46IHN0cmluZykge1xyXG5cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbWVzc2FnZUd1aWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX21lc3NhZ2UubXNnR3VpZDsgfVxyXG5cclxuICBwdWJsaWMgc2VuZCgpOiBQcmVwYXJlZE1lc3NhZ2Uge1xyXG4gICAgdGhpcy5fdGFyZ2V0LnBvc3RNZXNzYWdlKHRoaXMuX21lc3NhZ2UsIHRoaXMuX29yaWdpbik7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L2pzLWFwaS9hcGktbWVzc2FnaW5nL3NyYy9Dcm9zc0ZyYW1lUHJlcGFyZWRNZXNzYWdlLnRzXG4gKiovIiwiaW1wb3J0IHsgRXhlY3V0ZVBhcmFtZXRlcnMsIE1vZGVsLCBOb3RpZmljYXRpb25JZCwgVmVyYklkLCBWZXJzaW9uTnVtYmVyIH0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuXHJcbi8qKlxyXG4gKiBFbnVtIGRlZmluaW5nIHRoZSA0IGRpZmZlcmVudCB0eXBlcyBvZiBtZXNzYWdlcyB3ZSBoYXZlIGRlZmluZWRcclxuICovXHJcbmV4cG9ydCBlbnVtIE1lc3NhZ2VUeXBlIHtcclxuICBJbml0aWFsaXplID0gJ2luaXRpYWxpemUnLFxyXG4gIE5vdGlmaWNhdGlvbiA9ICdub3RpZmljYXRpb24nLFxyXG4gIENvbW1hbmQgPSAnY29tbWFuZCcsXHJcbiAgQ29tbWFuZFJlc3BvbnNlID0gJ2NvbW1hbmQtcmVzcG9uc2UnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgTWVzc2FnZSBpbnRlcmZhY2UgaXMgdGhlIGJhc2UgaW50ZXJmYWNlIGZvciBhbGwgdGhlIG90aGVyXHJcbiAqIG1lc3NhZ2UgdHlwZSBpbnRlcmZhY2VzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlIHtcclxuICAvKipcclxuICAgKiBBIHVuaXF1ZSBpZCBmb3IgdGhpcyBtZXNzYWdlXHJcbiAgICovXHJcbiAgbXNnR3VpZDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdHlwZSBvZiB0aGlzIG1lc3NhZ2VcclxuICAgKi9cclxuICBtc2dUeXBlOiBNZXNzYWdlVHlwZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBpbml0aWFsaXplIG1lc3NhZ2UgaXMgdGhlIGZpcnN0IG1lc3NhZ2Ugd2hpY2ggd2lsbCBiZSBzZW50XHJcbiAqIGZyb20gdGhlIGphdmFzY3JpcHQgdG8gc2V0IHVwIGNvbW11bmljYXRpb25zXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEluaXRpYWxpemVNZXNzYWdlIGV4dGVuZHMgTWVzc2FnZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHZlcnNpb24gb2YgdGhlIGFwaSB3aGljaCB0aGUgc2VuZGVyIHdhbnRzIHRvIHVzZVxyXG4gICAqL1xyXG4gIGFwaVZlcnNpb246IFZlcnNpb25OdW1iZXI7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB2ZXJzaW9uIG9mIHRoaXMgbWVzc2FnaW5nIGNvbnRyYWN0IHRvIGJlIHVzZWQuIEZvciBub3csIHRoZXJlXHJcbiAgICogc2hvdWxkIG9ubHkgYmUgYSBzaW5nbGUgdmVyc2lvbiBidXQgc2VuZGluZyB0aGlzIGFsb25nIHNob3VsZCBoZWxwXHJcbiAgICogaWYgd2UgbmVlZCB0byBhZGQgYSBuZXcgdmVyc2lvbiBpbiBhIGZ1dHVyZSByZWxlYXNlXHJcbiAgICovXHJcbiAgY3Jvc3NGcmFtZVZlcnNpb246IFZlcnNpb25OdW1iZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIG1lc3NhZ2UgaXMgc2VudCB3aGVuIGEgbm90aWZpY2F0aW9uIG9jY3VycyBmcm9tIHRoZSBwcmVzbGF5ZXJcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm90aWZpY2F0aW9uTWVzc2FnZSBleHRlbmRzIE1lc3NhZ2Uge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBpZCBmb3IgdGhpcyB0eXBlIG9mIG5vdGlmaWNhdGlvblxyXG4gICAqL1xyXG4gIG5vdGlmaWNhdGlvbklkOiBOb3RpZmljYXRpb25JZDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGRhdGEgd2hpY2ggY2FtZSBhbG9uZyB3aXRoIHRoZSBub3RpZmljYXRpb25cclxuICAgKi9cclxuICBkYXRhOiBNb2RlbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgY2FsbGluZyBhbiBpbnRlcm5hbCBjb250cmFjdCBjb21tYW5kXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIENvbW1hbmRNZXNzYWdlIGV4dGVuZHMgTWVzc2FnZSB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGlkIG9mIHRoZSBjb21tYW5kIHdoaWNoIHNob3VsZCBiZSBleGVjdXRlZFxyXG4gICAqL1xyXG4gIHZlcmJJZDogVmVyYklkO1xyXG5cclxuICAvKipcclxuICAgKiBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgcGFyYW1ldGVycyBmb3IgdGhlIGNvbW1hbmRcclxuICAgKi9cclxuICBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycztcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgbWVzc2FnZSBpcyBzZW50IGluIHJlc3BvbnNlIHRvIGEgQ29tbWFuZE1lc3NhZ2Ugd2l0aCB0aGVcclxuICogcmVzdWx0IG9mIHRoYXQgY29tbWFuZHMgaW52b2NhdGlvblxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDb21tYW5kUmVzcG9uc2VNZXNzYWdlIGV4dGVuZHMgTWVzc2FnZSB7XHJcbiAgLyoqXHJcbiAgICogR3VpZCBvZiB0aGUgQ29tbWFuZE1lc3NhZ2Ugd2hpY2ggdGhpcyBpcyBpbiByZXNwb25zZSB0b1xyXG4gICAqL1xyXG4gIGNvbW1hbmRHdWlkOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRoZXJlIHdhcyBhbiBlcnJvciByZXR1cm5lZCBmcm9tIHRoZSBjb21tYW5kLCB0aGlzIHdpbGwgYmUgZGVmaW5lZFxyXG4gICAqIGFuZCBjb250YWluIHRoZSBlcnJvclxyXG4gICAqL1xyXG4gIGVycm9yPzogTW9kZWw7XHJcblxyXG4gIC8qKlxyXG4gICAqIElmIHRoZSBjb21tYW5kIGV4ZWN1dGVkIHN1Y2Nlc3NmdWxseSwgdGhpcyB3aWxsIGNvbnRhaW4gdGhlIGNvbW1hbmQgcmVzdWx0XHJcbiAgICovXHJcbiAgZGF0YT86IE1vZGVsO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLW1lc3NhZ2luZy9zcmMvaW50ZXJmYWNlL01lc3NhZ2VUeXBlcy50c1xuICoqLyIsImltcG9ydCB7IFZlcnNpb25OdW1iZXIgfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBHdWlkIH0gZnJvbSAnQHRhYmxlYXUvZ3VpZCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIENvbW1hbmRNZXNzYWdlLFxyXG4gIENvbW1hbmRSZXNwb25zZU1lc3NhZ2UsXHJcbiAgSW5pdGlhbGl6ZU1lc3NhZ2UsXHJcbiAgTWVzc2FnZSxcclxuICBNZXNzYWdlVHlwZSxcclxuICBOb3RpZmljYXRpb25NZXNzYWdlLFxyXG59IGZyb20gJy4vaW50ZXJmYWNlL01lc3NhZ2VUeXBlcyc7XHJcblxyXG4vKiB0c2xpbnQ6ZGlzYWJsZSBuby1hbnkgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTWVzc2FnZShkYXRhOiBNZXNzYWdlIHwgYW55KTogZGF0YSBpcyBNZXNzYWdlIHtcclxuICBpZiAoIWRhdGEpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1lc3NhZ2UgPSBkYXRhIGFzIE1lc3NhZ2U7XHJcbiAgaWYgKCFtZXNzYWdlIHx8ICFtZXNzYWdlLm1zZ0d1aWQgfHwgIW1lc3NhZ2UubXNnVHlwZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFHdWlkLmlzR3VpZChtZXNzYWdlLm1zZ0d1aWQpKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIG1lc3NhZ2UubXNnVHlwZSAhPT0gJ3N0cmluZycpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1lc3NhZ2VUeXBlczogQXJyYXk8c3RyaW5nPiA9XHJcbiAgWyBNZXNzYWdlVHlwZS5Db21tYW5kLCBNZXNzYWdlVHlwZS5Db21tYW5kUmVzcG9uc2UsIE1lc3NhZ2VUeXBlLkluaXRpYWxpemUsIE1lc3NhZ2VUeXBlLk5vdGlmaWNhdGlvbiBdO1xyXG5cclxuICBpZiAobWVzc2FnZVR5cGVzLmluZGV4T2YobWVzc2FnZS5tc2dUeXBlKSA8IDApIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNWZXJzaW9uKHZlcnNpb25OdW1iZXI6IFZlcnNpb25OdW1iZXIgfCBhbnkpOiB2ZXJzaW9uTnVtYmVyIGlzIFZlcnNpb25OdW1iZXIge1xyXG4gIGlmICghdmVyc2lvbk51bWJlcikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdiA9IHZlcnNpb25OdW1iZXIgYXMgVmVyc2lvbk51bWJlcjtcclxuXHJcbiAgaWYgKHR5cGVvZiB2ICE9PSAnb2JqZWN0Jykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiB2LmZpeCAhPT0gJ251bWJlcicgfHwgdHlwZW9mIHYubWlub3IgIT09ICdudW1iZXInIHx8IHR5cGVvZiB2Lm1ham9yICE9PSAnbnVtYmVyJykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0luaXRNZXNzYWdlKG1lc3NhZ2U6IEluaXRpYWxpemVNZXNzYWdlIHwgYW55KTogbWVzc2FnZSBpcyBJbml0aWFsaXplTWVzc2FnZSB7XHJcbiAgaWYgKCFpc01lc3NhZ2UobWVzc2FnZSkpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGluaXRNZXNzYWdlID0gbWVzc2FnZSBhcyBJbml0aWFsaXplTWVzc2FnZTtcclxuICBpZiAoaW5pdE1lc3NhZ2UubXNnVHlwZSAhPT0gTWVzc2FnZVR5cGUuSW5pdGlhbGl6ZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFpbml0TWVzc2FnZS5hcGlWZXJzaW9uIHx8ICFpc1ZlcnNpb24oaW5pdE1lc3NhZ2UuYXBpVmVyc2lvbikpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmICghaW5pdE1lc3NhZ2UuY3Jvc3NGcmFtZVZlcnNpb24gfHwgIWlzVmVyc2lvbihpbml0TWVzc2FnZS5jcm9zc0ZyYW1lVmVyc2lvbikpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0cnVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNDb21tYW5kUmVzcG9uc2VNZXNzYWdlKG1lc3NhZ2U6IENvbW1hbmRSZXNwb25zZU1lc3NhZ2UgfCBhbnkpOiBtZXNzYWdlIGlzIENvbW1hbmRSZXNwb25zZU1lc3NhZ2Uge1xyXG4gIGlmICghaXNNZXNzYWdlKG1lc3NhZ2UpKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjck1lc3NhZ2UgPSBtZXNzYWdlIGFzIENvbW1hbmRSZXNwb25zZU1lc3NhZ2U7XHJcbiAgaWYgKGNyTWVzc2FnZS5tc2dUeXBlICE9PSBNZXNzYWdlVHlwZS5Db21tYW5kUmVzcG9uc2UpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmICghR3VpZC5pc0d1aWQoY3JNZXNzYWdlLmNvbW1hbmRHdWlkKSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFjck1lc3NhZ2UuZGF0YSAmJiAhY3JNZXNzYWdlLmVycm9yKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29tbWFuZE1lc3NhZ2UobWVzc2FnZTogQ29tbWFuZE1lc3NhZ2UgfCBhbnkpOiBtZXNzYWdlIGlzIENvbW1hbmRNZXNzYWdlIHtcclxuICBpZiAoIWlzTWVzc2FnZShtZXNzYWdlKSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29tbWFuZE1lc3NhZ2UgPSBtZXNzYWdlIGFzIENvbW1hbmRNZXNzYWdlO1xyXG4gIGlmIChjb21tYW5kTWVzc2FnZS5tc2dUeXBlICE9PSBNZXNzYWdlVHlwZS5Db21tYW5kKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoIWNvbW1hbmRNZXNzYWdlLnBhcmFtZXRlcnMgfHwgdHlwZW9mIGNvbW1hbmRNZXNzYWdlLnBhcmFtZXRlcnMgIT09ICdvYmplY3QnKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoIWNvbW1hbmRNZXNzYWdlLnZlcmJJZCB8fCB0eXBlb2YgY29tbWFuZE1lc3NhZ2UudmVyYklkICE9PSAnc3RyaW5nJykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc05vdGlmaWNhdGlvbk1lc3NhZ2UobWVzc2FnZTogTm90aWZpY2F0aW9uTWVzc2FnZSB8IGFueSk6IG1lc3NhZ2UgaXMgTm90aWZpY2F0aW9uTWVzc2FnZSB7XHJcbiAgaWYgKCFpc01lc3NhZ2UobWVzc2FnZSkpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG5vdGlmaWNhdGlvbk1lc3NhZ2UgPSBtZXNzYWdlIGFzIE5vdGlmaWNhdGlvbk1lc3NhZ2U7XHJcbiAgaWYgKG5vdGlmaWNhdGlvbk1lc3NhZ2UubXNnVHlwZSAhPT0gTWVzc2FnZVR5cGUuTm90aWZpY2F0aW9uKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpZiAoIW5vdGlmaWNhdGlvbk1lc3NhZ2UuZGF0YSB8fCB0eXBlb2Ygbm90aWZpY2F0aW9uTWVzc2FnZS5kYXRhICE9PSAnb2JqZWN0Jykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFub3RpZmljYXRpb25NZXNzYWdlLm5vdGlmaWNhdGlvbklkIHx8IHR5cGVvZiBub3RpZmljYXRpb25NZXNzYWdlLm5vdGlmaWNhdGlvbklkICE9PSAnc3RyaW5nJykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L2pzLWFwaS9hcGktbWVzc2FnaW5nL3NyYy9NZXNzYWdlVHlwZUNoZWNrcy50c1xuICoqLyIsImltcG9ydCB7XHJcbiAgRXhlY3V0ZVBhcmFtZXRlcnMsXHJcbiAgRXhlY3V0ZVJlc3BvbnNlLFxyXG4gIEludGVybmFsQXBpRGlzcGF0Y2hlcixcclxuICBNb2RlbCxcclxuICBOb3RpZmljYXRpb25IYW5kbGVyLFxyXG4gIFZlcmJJZCxcclxuICBWZXJzaW9uTnVtYmVyLFxyXG59IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IENvbW1hbmRSZXNwb25zZU1lc3NhZ2UsIE1lc3NlbmdlciwgTm90aWZpY2F0aW9uTWVzc2FnZSB9IGZyb20gJ0B0YWJsZWF1L2FwaS1tZXNzYWdpbmcnO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlIEludGVybmFsQXBpRGlzcGF0Y2hlciBpbnRlcmZhY2Ugd2hpY2ggZnVuY3Rpb25zIGJ5IHBhc3NpbmcgbWVzc2FnZXNcclxuICogYWNyb3NzIGEgZnJhbWUgYm91bmRhcnkuIFRoaXMgaXMgdXN1YWxseSBiZXR3ZWVuIHRoZSBjb2RlIHdoZXJlIG91ciBqYXZzY3JpcHQgbGlicmFyeSBoYXMgYmVlbiBpbmNsdWRlZFxyXG4gKiBieSBhIDNyZCBwYXJ0eSBkZXYgYW5kIGFub3RoZXIgZnJhbWUgd2hlcmUgVGFibGVhdSBzZXJ2ZXIgaGFzIGNvbnRlbnQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQ3Jvc3NGcmFtZURpc3BhdGNoZXIgaW1wbGVtZW50cyBJbnRlcm5hbEFwaURpc3BhdGNoZXIge1xyXG5cclxuICAvLyBUaGUgYXBpIHZlcnNpb24gd2UgYXJlIG9wZXJhdGluZyB0aHJvdWdoXHJcbiAgcHJpdmF0ZSBfdmVyc2lvbk51bWJlcjogVmVyc2lvbk51bWJlcjtcclxuXHJcbiAgLy8gQ29sbGVjdGlvbiBvZiBwZW5kaW5nIHByb21pc2VzIHdoaWNoIGFyZSB3YWl0aW5nIHRvIGJlIHJlc29sdmVkLiBXaGVuIHdlIHJlY2VpdmUgYSByZXNwb25zZSBiYWNrIGZyb20gdGhlIG90aGVyIGZyYW1lLFxyXG4gIC8vIHRoZXNlIHByb21pc2VzIGNhbiBiZSBlaXRoZXIgcmVzb2x2ZWQgb3IgcmVqZWN0ZWRcclxuICBwcml2YXRlIF9wZW5kaW5nUHJvbWlzZXM6IHsgW21lc3NhZ2VHdWlkOiBzdHJpbmddOiB7IHJlc29sdmU6IChyZXNwb25zZTogRXhlY3V0ZVJlc3BvbnNlKSA9PiB2b2lkLCByZWplY3Q6IChlcnJvcjogTW9kZWwpID0+IHZvaWR9IH0gPSB7fTtcclxuXHJcbiAgLy8gVGhlIGNvbGxlY3Rpb24gb2Ygbm90aWZpY2F0aW9uIGhhbmRsZXJzIHdoaWNoIGhhdmUgYmVlbiByZWdpc3RlcmVkIHdpdGggdGhpcyBkaXNwYXRjaGVyXHJcbiAgcHJpdmF0ZSBfbm90aWZpY2F0aW9uSGFuZGxlcnM6IEFycmF5PE5vdGlmaWNhdGlvbkhhbmRsZXI+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgQ3Jvc3NGcmFtZURpc3BhdGNoZXIgd2hpY2ggd2lsbCB1c2UgdGhlIGdpdmVuIG1lc3NlbmdlciB0byBjb21tdW5pY2F0ZVxyXG4gICAqIEBwYXJhbSBfbWVzc2VuZ2VyIGFuIGluc3RhbnRpYXRlZCBhbmQgbGlzdGVuaW5nIG1lc3NlbmdlciBvYmplY3RcclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVzc2VuZ2VyOiBNZXNzZW5nZXIpIHtcclxuICAgIGlmICghdGhpcy5fbWVzc2VuZ2VyKSB7XHJcbiAgICAgIHRocm93ICdNaXNzaW5nIG1lc3NlbmdlciBvYmplY3QnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNldCB1cCBvdXIgbWVzc2FnZSBoYW5kbGVycy4gV2Ugb25seSBjYXJlIGFib3V0IGluY29taW5nIG5vdGlmaWNhdGlvbnMgYW5kIGNvbW1hbmQgcmVzcG9uc2VzXHJcbiAgICB0aGlzLl9tZXNzZW5nZXIuc2V0Q29tbWFuZFJlc3BvbnNlTWVzc2FnZUhhbmRsZXIodGhpcy5vbkNvbW1hbmRSZXNwb25zZS5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuX21lc3Nlbmdlci5zZXROb3RpZmljYXRpb25NZXNzYWdlSGFuZGxlcih0aGlzLm9uTm90aWZpY2F0aW9uLmJpbmQodGhpcykpO1xyXG4gIH1cclxuXHJcbiAgLy8vLy8vIFN0YXJ0IEludGVybmFsQXBpRGlzcGF0Y2hlciBpbXBsZW1lbnRhdGlvblxyXG5cclxuICBwdWJsaWMgc2V0VmVyc2lvbk51bWJlcih2ZXJzaW9uTnVtYmVyOiBWZXJzaW9uTnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLl92ZXJzaW9uTnVtYmVyID0gdmVyc2lvbk51bWJlcjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBleGVjdXRlKHZlcmI6IFZlcmJJZCwgcGFyYW1ldGVyczogRXhlY3V0ZVBhcmFtZXRlcnMpOiBQcm9taXNlPEV4ZWN1dGVSZXNwb25zZT4ge1xyXG4gICAgLy8gVG8gZXhlY3V0ZSBhIHZlcmIsIHdlIGZpcnN0IHByZXBhcmUgYSBjb21tYW5kIG1lc3NhZ2UgYW5kIHRoZW4gZGVmaW5lIGEgcHJvbWlzZS5cclxuICAgIGNvbnN0IHByZXBhcmVkTWVzc2FnZSA9IHRoaXMuX21lc3Nlbmdlci5wcmVwYXJlQ29tbWFuZE1lc3NhZ2UodmVyYiwgcGFyYW1ldGVycyk7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2U8RXhlY3V0ZVJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG4gICAgICAvLyBTYXZlIG9mZiB0aGUgcGVuZGluZyBwcm9taXNlIGJ5IHRoZSBtZXNzYWdlR3VpZCB3ZSBhcmUgYWJvdXQgdG8gc2VuZC4gV2hlbiBhIHJlc3BvbnNlIGlzXHJcbiAgICAgIC8vIHJlY2VpdmVkLCB3ZSdsbCBiZSBhYmxlIHRvIHJlc29sdmUgdGhpcyBwcm9taXNlIHdpdGggdGhlIHJlc3VsdFxyXG4gICAgICB0aGlzLl9wZW5kaW5nUHJvbWlzZXNbcHJlcGFyZWRNZXNzYWdlLm1lc3NhZ2VHdWlkXSA9IHsgcmVzb2x2ZTogcmVzb2x2ZSwgcmVqZWN0OiByZWplY3QgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFjdHVhbGx5IHNlbmQgdGhlIG1lc3NhZ2UgYW5kIHJldHVybiB0aGUgcHJvbWlzZVxyXG4gICAgcHJlcGFyZWRNZXNzYWdlLnNlbmQoKTtcclxuICAgIHJldHVybiBwcm9taXNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZ2lzdGVyTm90aWZpY2F0aW9uSGFuZGxlcihoYW5kbGVyOiBOb3RpZmljYXRpb25IYW5kbGVyKTogdm9pZCB7XHJcbiAgICB0aGlzLl9ub3RpZmljYXRpb25IYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVucmVnaXN0ZXJOb3RpZmljYXRpb25IYW5kbGVyKGhhbmRsZXI6IE5vdGlmaWNhdGlvbkhhbmRsZXIpOiB2b2lkIHtcclxuICAgIHRoaXMuX25vdGlmaWNhdGlvbkhhbmRsZXJzID0gdGhpcy5fbm90aWZpY2F0aW9uSGFuZGxlcnMuZmlsdGVyKGggPT4gaCAhPT0gaGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICAvLy8vLy8gRW5kIEludGVybmFsQXBpRGlzcGF0Y2hlciBpbXBsZW1lbnRhdGlvblxyXG5cclxuICBwcml2YXRlIG9uQ29tbWFuZFJlc3BvbnNlKHJlc3BvbnNlOiBDb21tYW5kUmVzcG9uc2VNZXNzYWdlKTogdm9pZCB7XHJcbiAgICAvLyBXZSBnb3QgYSBjb21tYW5kIHJlc3BvbnNlLCBsb29rIHRocm91Z2ggdGhlIHBlbmRpbmcgcHJvbWlzZXMgYW5kIHJlc29sdmVcclxuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLl9wZW5kaW5nUHJvbWlzZXMpLmluZGV4T2YocmVzcG9uc2UuY29tbWFuZEd1aWQpIDwgMCkge1xyXG4gICAgICByZXR1cm47IC8vIFdlIGRvbid0IGhhdmUgYW55IHJlZmVyZW5jZSB0byB0aGlzIGNvbW1hbmQsIGp1c3QgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGVuZGluZ1Byb21pc2UgPSB0aGlzLl9wZW5kaW5nUHJvbWlzZXNbcmVzcG9uc2UuY29tbWFuZEd1aWRdO1xyXG5cclxuICAgIC8vIElmIHdlIGhhdmUgYW4gZXJyb3IgZGVmaW5lZCwgcmVqZWN0IHRoZSBwcm9taXNlXHJcbiAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcclxuICAgICAgcGVuZGluZ1Byb21pc2UucmVqZWN0KHJlc3BvbnNlLmVycm9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiB3ZSBoYXZlIGRhdGEgZGVmaW5lZCwgcmVzb2x2ZSB0aGUgcHJvbWlzZVxyXG4gICAgaWYgKHJlc3BvbnNlLmRhdGEpIHtcclxuICAgICAgcGVuZGluZ1Byb21pc2UucmVzb2x2ZSh7cmVzdWx0OiByZXNwb25zZS5kYXRhfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2xlYW4gdXAgb3VyIHBlbmRpbmcgcHJvbWlzZXMgb2JqZWN0XHJcbiAgICBkZWxldGUgdGhpcy5fcGVuZGluZ1Byb21pc2VzW3Jlc3BvbnNlLmNvbW1hbmRHdWlkXTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb25Ob3RpZmljYXRpb24obm90aWZpY2F0aW9uTWVzc2FnZTogTm90aWZpY2F0aW9uTWVzc2FnZSk6IHZvaWQge1xyXG4gICAgLy8gR28gdGhyb3VnaCBlYWNoIG5vdGlmaWNhdGlvbiBoYW5kbGVyIHdlIGhhdmUgcmVnaXN0ZXJlZCBhbmQgbGV0IHRoZW0ga25vdyBhIG5vdGlmaWNhdGlvbiBjYW1lIGluXHJcbiAgICBmb3IgKGNvbnN0IGhhbmRsZXIgb2YgdGhpcy5fbm90aWZpY2F0aW9uSGFuZGxlcnMpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBoYW5kbGVyKHtub3RpZmljYXRpb25JZDogbm90aWZpY2F0aW9uTWVzc2FnZS5ub3RpZmljYXRpb25JZCwgZGF0YTogbm90aWZpY2F0aW9uTWVzc2FnZS5kYXRhfSk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyBJZ25vcmUgdGhpcy4gV3JhcCBpbiB0cnkvY2F0Y2ggc28gaWYgb25lIGhhbmRsZXIgZXJyb3JzLCB0aGUgb3RoZXIgc3RpbGwgZ2V0IHRoZSBtZXNzYWdlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRDovZGV2L2pzLWFwaS9hcGktc2hhcmVkL3NyYy9Dcm9zc0ZyYW1lL0Nyb3NzRnJhbWVEaXNwYXRjaGVyLnRzXG4gKiovIiwiaW1wb3J0IHsgVmVyc2lvbk51bWJlciBhcyBWZXJzaW9uTnVtYmVyQ29udHJhY3QgfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBUYWJsZWF1RXhjZXB0aW9uIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXV0aWxzJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBjdXJyZW50IHZlcnNpb24gb2YgdGhlIGV4dGVuc2lvbnMgbGlicmFyeVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZlcnNpb25OdW1iZXIgaW1wbGVtZW50cyBWZXJzaW9uTnVtYmVyQ29udHJhY3Qge1xyXG5cclxuICAvLyBVc2luZyBzb21lIHdlYnBhY2sgdHJpY2tzLCB3ZSBjYW4gaW5qZWN0IHRoaXMgdmVyc2lvbiBpbnRvIG91ciBjb2RlIChraW5kYSBsaWtlIGMrKyBwcmVwcm9jZXNzb3Igc3R1ZmYpXHJcbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBWZXJzaW9uTnVtYmVyO1xyXG4gIHByaXZhdGUgc3RhdGljIElOVkFMSURfVkVSU0lPTl9OVU1CRVI6IHN0cmluZyA9ICdJbnZhbGlkIHZlcnNpb24gbnVtYmVyOiAnO1xyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBzaW5nbGV0b24gaW5zdGFuY2Ugb2YgdGhlIHZlcnNpb24gbnVtYmVyLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IEluc3RhbmNlKCk6IFZlcnNpb25OdW1iZXIge1xyXG4gICAgcmV0dXJuIFZlcnNpb25OdW1iZXIuX2luc3RhbmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBTZXRWZXJzaW9uTnVtYmVyKG51bVN0cmluZzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBWZXJzaW9uTnVtYmVyLl9pbnN0YW5jZSA9IG5ldyBWZXJzaW9uTnVtYmVyKG51bVN0cmluZyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVhZG9ubHkgbWFqb3I6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgbWlub3I6IG51bWJlcjtcclxuICBwdWJsaWMgcmVhZG9ubHkgZml4OiBudW1iZXI7XHJcblxyXG4gIC8vIHByaXZhdGUgY29uc3RydWN0b3Igc28gZXZlcnlvbmUgdXNlcyB0aGUgc2luZ2xldG9uIGluc3RhbmNlXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcih2ZXJzaW9uU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IHBhcnRzID0gdmVyc2lvblN0cmluZy5zcGxpdCgnLicpLm1hcChwID0+IHBhcnNlSW50KHAsIDEwKSk7XHJcbiAgICBpZiAocGFydHMubGVuZ3RoICE9PSAzKSB7XHJcbiAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uZXJyb3IoVmVyc2lvbk51bWJlci5JTlZBTElEX1ZFUlNJT05fTlVNQkVSLCBbdmVyc2lvblN0cmluZ10pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubWFqb3IgPSBwYXJ0c1swXTtcclxuICAgIHRoaXMubWlub3IgPSBwYXJ0c1sxXTtcclxuICAgIHRoaXMuZml4ID0gcGFydHNbMl07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGZvcm1hdHRlZFZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gYCR7dGhpcy5tYWpvcn0uJHt0aGlzLm1pbm9yfS4ke3RoaXMuZml4fWA7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEQ6L2Rldi9qcy1hcGkvYXBpLXNoYXJlZC9zcmMvVmVyc2lvbk51bWJlci50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5pbXBvcnQgeyBEYXNoYm9hcmRJbXBsIH0gZnJvbSAnLi9JbnRlcm5hbC9EYXNoYm9hcmRJbXBsJztcclxuaW1wb3J0IHsgU2hlZXQgfSBmcm9tICcuL1NoZWV0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBTaGVldCBpbXBsZW1lbnRzIENvbnRyYWN0LkRhc2hib2FyZCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Rhc2hib2FyZEltcGw6IERhc2hib2FyZEltcGwpIHtcclxuICAgIHN1cGVyKF9kYXNoYm9hcmRJbXBsKTtcclxuICAgIF9kYXNoYm9hcmRJbXBsLmluaXRpYWxpemVXaXRoUHVibGljSW50ZXJmYWNlcyh0aGlzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgd29ya3NoZWV0cygpOiBBcnJheTxDb250cmFjdC5Xb3Jrc2hlZXQ+IHtcclxuICAgIHJldHVybiB0aGlzLl9kYXNoYm9hcmRJbXBsLndvcmtzaGVldHM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG9iamVjdHMoKTogQXJyYXk8Q29udHJhY3QuRGFzaGJvYXJkT2JqZWN0PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGFzaGJvYXJkSW1wbC5vYmplY3RzO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvRGFzaGJvYXJkLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IEV2ZW50TGlzdGVuZXJNYW5hZ2VyIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXNoYXJlZCc7XHJcblxyXG5pbXBvcnQgeyBTaGVldEltcGwgfSBmcm9tICcuL0ludGVybmFsL1NoZWV0SW1wbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2hlZXQgZXh0ZW5kcyBFdmVudExpc3RlbmVyTWFuYWdlciBpbXBsZW1lbnRzIENvbnRyYWN0LlNoZWV0IHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfc2hlZXRJbXBsOiBTaGVldEltcGwpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldEltcGwubmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2hlZXRUeXBlKCk6IENvbnRyYWN0LlNoZWV0VHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hlZXRJbXBsLnNoZWV0VHlwZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2l6ZSgpOiBDb250cmFjdC5TaXplIHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldEltcGwuc2l6ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaW5kUGFyYW1ldGVyQXN5bmMocGFyYW1ldGVyTmFtZTogc3RyaW5nKTogUHJvbWlzZTxDb250cmFjdC5QYXJhbWV0ZXIgfCB1bmRlZmluZWQ+IHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldEltcGwuZmluZFBhcmFtZXRlckFzeW5jKHBhcmFtZXRlck5hbWUsIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFBhcmFtZXRlcnNBc3luYygpOiBQcm9taXNlPEFycmF5PENvbnRyYWN0LlBhcmFtZXRlcj4+IHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldEltcGwuZ2V0UGFyYW1ldGVyc0FzeW5jKHRoaXMpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvU2hlZXQudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBleHRlcm5hbCBEYXNoYm9hcmRDb250ZW50IG5hbWVzcGFjZS5cclxuICogVGhpcyBkb2VzIG5vdCBmb2xsb3cgdGhlIEltcGwgcGF0dGVybiBhcyBEYXNoYm9hcmRDb250ZW50IGlzXHJcbiAqIGN1cnJlbnRseSBqdXN0IGEgKHNpbmdsZSkgcHJvcGVydHkgYmFnLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhc2hib2FyZENvbnRlbnQgaW1wbGVtZW50cyBDb250cmFjdC5EYXNoYm9hcmRDb250ZW50IHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfZGFzaGJvYXJkOiBDb250cmFjdC5EYXNoYm9hcmQpIHsgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGRhc2hib2FyZCgpOiBDb250cmFjdC5EYXNoYm9hcmQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Rhc2hib2FyZDtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL05hbWVzcGFjZXMvRGFzaGJvYXJkQ29udGVudC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5pbXBvcnQgeyBFeHRlbnNpb25FbnZpcm9ubWVudCB9IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IEludGVybmFsVG9FeHRlcm5hbEVudW1NYXBwaW5ncyBhcyBFbnVtTWFwcGluZ3MgfSBmcm9tICdAdGFibGVhdS9hcGktc2hhcmVkJztcclxuXHJcbi8qKlxyXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgZXh0ZXJuYWwgZW52aXJvbm1lbnQgbmFtZXNwYWNlLlxyXG4gKiBFbnZpcm9ubWVudCBkb2VzIG5vdCBmb2xsb3cgdGhlIEltcGwgcGF0dGVybiBhcyBpdCBpc1xyXG4gKiBqdXN0IGEgcHJvcGVydHkgYmFnLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVudmlyb25tZW50IGltcGxlbWVudHMgQ29udHJhY3QuRW52aXJvbm1lbnQge1xyXG4gIHByaXZhdGUgX2FwaVZlcnNpb246IHN0cmluZztcclxuICBwcml2YXRlIF9jb250ZXh0OiBDb250cmFjdC5FeHRlbnNpb25Db250ZXh0O1xyXG4gIHByaXZhdGUgX2xhbmd1YWdlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfbG9jYWxlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfbW9kZTogQ29udHJhY3QuRXh0ZW5zaW9uTW9kZTtcclxuICBwcml2YXRlIF9vcGVyYXRpbmdTeXN0ZW06IHN0cmluZztcclxuICBwcml2YXRlIF90YWJsZWF1VmVyc2lvbjogc3RyaW5nO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IoZXh0ZW5zaW9uRW52aXJvbm1lbnQ6IEV4dGVuc2lvbkVudmlyb25tZW50KSB7XHJcbiAgICB0aGlzLl9hcGlWZXJzaW9uID0gZXh0ZW5zaW9uRW52aXJvbm1lbnQuYXBpVmVyc2lvbjtcclxuICAgIHRoaXMuX2NvbnRleHQgPSBFbnVtTWFwcGluZ3MuZXh0ZW5zaW9uQ29udGV4dC5jb252ZXJ0KGV4dGVuc2lvbkVudmlyb25tZW50LmV4dGVuc2lvbkNvbnRleHQpO1xyXG4gICAgdGhpcy5fbGFuZ3VhZ2UgPSBleHRlbnNpb25FbnZpcm9ubWVudC5leHRlbnNpb25MYW5ndWFnZTtcclxuICAgIHRoaXMuX2xvY2FsZSA9IGV4dGVuc2lvbkVudmlyb25tZW50LmV4dGVuc2lvbkxvY2FsZTtcclxuICAgIHRoaXMuX21vZGUgPSBFbnVtTWFwcGluZ3MuZXh0ZW5zaW9uTW9kZS5jb252ZXJ0KGV4dGVuc2lvbkVudmlyb25tZW50LmV4dGVuc2lvbk1vZGUpO1xyXG4gICAgdGhpcy5fb3BlcmF0aW5nU3lzdGVtID0gZXh0ZW5zaW9uRW52aXJvbm1lbnQub3BlcmF0aW5nU3lzdGVtO1xyXG4gICAgdGhpcy5fdGFibGVhdVZlcnNpb24gPSBleHRlbnNpb25FbnZpcm9ubWVudC50YWJsZWF1VmVyc2lvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgYXBpVmVyc2lvbigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FwaVZlcnNpb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGNvbnRleHQoKTogQ29udHJhY3QuRXh0ZW5zaW9uQ29udGV4dCB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbGFuZ3VhZ2UoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9sYW5ndWFnZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbG9jYWxlKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBtb2RlKCk6IENvbnRyYWN0LkV4dGVuc2lvbk1vZGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX21vZGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG9wZXJhdGluZ1N5c3RlbSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX29wZXJhdGluZ1N5c3RlbTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgdGFibGVhdVZlcnNpb24oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl90YWJsZWF1VmVyc2lvbjtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL05hbWVzcGFjZXMvRW52aXJvbm1lbnQudHNcbiAqKi8iLCJpbXBvcnQgeyBTZXR0aW5ncyBhcyBTZXR0aW5nc0NvbnRyYWN0IH0gZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IFNldHRpbmdzSW1wbCB9IGZyb20gJy4uL0ludGVybmFsL1NldHRpbmdzSW1wbCc7XHJcbmltcG9ydCB7IFNldHRpbmdzQ29sbGVjdGlvbiB9IGZyb20gJy4uL1NlcnZpY2VzL1NldHRpbmdzU2VydmljZSc7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50YXRpb24gb2YgdGhlIGV4dGVybmFsIHNldHRpbmdzIG5hbWVzcGFjZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyBpbXBsZW1lbnRzIFNldHRpbmdzQ29udHJhY3Qge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHNldHRpbmdzSW1wbDogU2V0dGluZ3NJbXBsKSB7IH1cclxuXHJcbiAgcHVibGljIGVyYXNlKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnNldHRpbmdzSW1wbC5lcmFzZShrZXkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldChrZXk6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nc0ltcGwuZ2V0KGtleSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0QWxsKCk6IFNldHRpbmdzQ29sbGVjdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nc0ltcGwuZ2V0QWxsKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGlzTW9kaWZpZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5nc0ltcGwuaXNNb2RpZmllZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzYXZlQXN5bmMoKTogUHJvbWlzZTxTZXR0aW5nc0NvbGxlY3Rpb24+IHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzSW1wbC5zYXZlQXN5bmMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuc2V0dGluZ3NJbXBsLnNldChrZXksIHZhbHVlKTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL05hbWVzcGFjZXMvU2V0dGluZ3MudHNcbiAqKi8iLCJpbXBvcnQgeyBJbnRlcm5hbEFwaURpc3BhdGNoZXIgfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVnaXN0cnkgfSBmcm9tICdAdGFibGVhdS9hcGktc2hhcmVkJztcclxuXHJcbmltcG9ydCB7IEluaXRpYWxpemF0aW9uU2VydmljZUltcGwgfSBmcm9tICcuL0ltcGwvSW5pdGlhbGl6YXRpb25TZXJ2aWNlSW1wbCc7XHJcbmltcG9ydCB7IFNldHRpbmdzU2VydmljZUltcGwgfSBmcm9tICAnLi9JbXBsL1NldHRpbmdzU2VydmljZUltcGwnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyQWxsRXh0ZW5zaW9uc1NlcnZpY2VzKGRpc3BhdGNoZXI6IEludGVybmFsQXBpRGlzcGF0Y2hlcik6IHZvaWQge1xyXG4gIEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5yZWdpc3RlclNlcnZpY2UobmV3IEluaXRpYWxpemF0aW9uU2VydmljZUltcGwoZGlzcGF0Y2hlcikpO1xyXG4gIEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5yZWdpc3RlclNlcnZpY2UobmV3IFNldHRpbmdzU2VydmljZUltcGwoZGlzcGF0Y2hlcikpO1xyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9TZXJ2aWNlcy9SZWdpc3RlckFsbEV4dGVuc2lvbnNTZXJ2aWNlcy50c1xuICoqLyIsImltcG9ydCB7IEV4dGVuc2lvbkJvb3RzdHJhcEluZm8sIEludGVybmFsQXBpRGlzcGF0Y2hlciwgVmVyYklkIH0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IEV4dGVuc2lvbnNTZXJ2aWNlTmFtZXMgfSBmcm9tICcuLi9FeHRlbnNpb25zU2VydmljZU5hbWVzJztcclxuaW1wb3J0IHsgSW5pdGlhbGl6YXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vSW5pdGlhbGl6YXRpb25TZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBJbml0aWFsaXphdGlvblNlcnZpY2VJbXBsIGltcGxlbWVudHMgSW5pdGlhbGl6YXRpb25TZXJ2aWNlIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBkaXNwYXRjaGVyOiBJbnRlcm5hbEFwaURpc3BhdGNoZXIpIHsgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNlcnZpY2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gRXh0ZW5zaW9uc1NlcnZpY2VOYW1lcy5Jbml0aWFsaXphdGlvblNlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaW5pdGlhbGl6ZURhc2hib2FyZEV4dGVuc2lvbnNBc3luYygpOiBQcm9taXNlPEV4dGVuc2lvbkJvb3RzdHJhcEluZm8+IHtcclxuICAgIC8vIFdlIGRvbid0IG5lZWQgYW55IHBhcmFtZXRlcnMgZm9yIHRoaXMgY2FsbCBiZWNhdXNlIHRoZXkgYXJlIGFkZGVkIGluIGZvciB1cyBieSB0aGUgZGlzcGF0Y2hlclxyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5Jbml0aWFsaXplRXh0ZW5zaW9uLCB7fSkudGhlbjxFeHRlbnNpb25Cb290c3RyYXBJbmZvPihyZXNwb25zZSA9PiB7XHJcbiAgICAgIC8vIFRPRE8gLSBWYWxpZGF0ZSByZXR1cm4gdmFsdWVcclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLnJlc3VsdCBhcyBFeHRlbnNpb25Cb290c3RyYXBJbmZvO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9TZXJ2aWNlcy9JbXBsL0luaXRpYWxpemF0aW9uU2VydmljZUltcGwudHNcbiAqKi8iLCJpbXBvcnQge1xyXG4gIEV4ZWN1dGVQYXJhbWV0ZXJzLFxyXG4gIEV4dGVuc2lvblNldHRpbmdzSW5mbyxcclxuICBJbnRlcm5hbEFwaURpc3BhdGNoZXIsXHJcbiAgUGFyYW1ldGVySWQsXHJcbiAgVmVyYklkXHJcbn0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgVGFibGVhdUV4Y2VwdGlvbiB9IGZyb20gJ0B0YWJsZWF1L2FwaS11dGlscyc7XHJcblxyXG5pbXBvcnQgeyBFeHRlbnNpb25zU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vRXh0ZW5zaW9uc1NlcnZpY2VOYW1lcyc7XHJcbmltcG9ydCB7IFNldHRpbmdzQ29sbGVjdGlvbiwgU2V0dGluZ3NTZXJ2aWNlIH0gZnJvbSAnLi4vU2V0dGluZ3NTZXJ2aWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1NlcnZpY2VJbXBsIGltcGxlbWVudHMgU2V0dGluZ3NTZXJ2aWNlIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBkaXNwYXRjaGVyOiBJbnRlcm5hbEFwaURpc3BhdGNoZXIpIHsgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNlcnZpY2VOYW1lKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gRXh0ZW5zaW9uc1NlcnZpY2VOYW1lcy5TZXR0aW5nc1NlcnZpY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2F2ZVNldHRpbmdzQXN5bmMoc2V0dGluZ3M6IFNldHRpbmdzQ29sbGVjdGlvbik6IFByb21pc2U8U2V0dGluZ3NDb2xsZWN0aW9uPiB7XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBFeGVjdXRlUGFyYW1ldGVycyA9IHtbUGFyYW1ldGVySWQuU2V0dGluZ3NWYWx1ZXNdOiBzZXR0aW5nc307XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5leGVjdXRlKFZlcmJJZC5TYXZlRXh0ZW5zaW9uU2V0dGluZ3MsIHBhcmFtZXRlcnMpLnRoZW48U2V0dGluZ3NDb2xsZWN0aW9uPih2YWx1ZSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbHVlLnJlc3VsdCBhcyBFeHRlbnNpb25TZXR0aW5nc0luZm87XHJcblxyXG4gICAgICBpZiAoIXJlc3VsdCB8fCAhcmVzdWx0LnNldHRpbmdzVmFsdWVzKSB7XHJcbiAgICAgICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5pbnRlcm5hbEVycm9yKFsnc2F2aW5nIHNldHRpbmdzLiddKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuKHJlc3VsdC5zZXR0aW5nc1ZhbHVlcyk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL1NlcnZpY2VzL0ltcGwvU2V0dGluZ3NTZXJ2aWNlSW1wbC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IERhc2hib2FyZE9iamVjdFR5cGUsIEV4dGVuc2lvbkRhc2hib2FyZEluZm8sIFNoZWV0UGF0aCwgVmlzdWFsSWQgfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBJbnRlcm5hbFRvRXh0ZXJuYWxFbnVtTWFwcGluZ3MsIFBvaW50LCBTaXplIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXNoYXJlZCc7XHJcblxyXG5pbXBvcnQgeyBEYXNoYm9hcmRPYmplY3QgfSBmcm9tICcuLi9EYXNoYm9hcmRPYmplY3QnO1xyXG5pbXBvcnQgeyBXb3Jrc2hlZXQgfSBmcm9tICcuLi9Xb3Jrc2hlZXQnO1xyXG5pbXBvcnQgeyBTaGVldEltcGwgfSBmcm9tICcuL1NoZWV0SW1wbCc7XHJcbmltcG9ydCB7IFNoZWV0SW5mb0ltcGwgfSBmcm9tICcuL1NoZWV0SW5mb0ltcGwnO1xyXG5pbXBvcnQgeyBXb3Jrc2hlZXRJbXBsIH0gZnJvbSAnLi9Xb3Jrc2hlZXRJbXBsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBEYXNoYm9hcmRJbXBsIGV4dGVuZHMgU2hlZXRJbXBsIHtcclxuICBwcml2YXRlIF93b3Jrc2hlZXRzOiBBcnJheTxDb250cmFjdC5Xb3Jrc2hlZXQ+O1xyXG4gIHByaXZhdGUgX29iamVjdHM6IEFycmF5PENvbnRyYWN0LkRhc2hib2FyZE9iamVjdD47XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF9pbmZvOiBFeHRlbnNpb25EYXNoYm9hcmRJbmZvLCBwcml2YXRlIF9zaGVldFBhdGg6IFNoZWV0UGF0aCkge1xyXG4gICAgc3VwZXIobmV3IFNoZWV0SW5mb0ltcGwoX2luZm8ubmFtZSwgQ29udHJhY3QuU2hlZXRUeXBlLkRhc2hib2FyZCwgbmV3IFNpemUoX2luZm8uc2l6ZS5oLCBfaW5mby5zaXplLncpKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHdvcmtzaGVldHMoKTogQXJyYXk8Q29udHJhY3QuV29ya3NoZWV0PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fd29ya3NoZWV0cztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgb2JqZWN0cygpOiBBcnJheTxDb250cmFjdC5EYXNoYm9hcmRPYmplY3Q+IHtcclxuICAgIHJldHVybiB0aGlzLl9vYmplY3RzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXRpYWxpemVXaXRoUHVibGljSW50ZXJmYWNlcyhkYXNoYm9hcmQ6IENvbnRyYWN0LkRhc2hib2FyZCk6IHZvaWQge1xyXG4gICAgdGhpcy5fd29ya3NoZWV0cyA9IG5ldyBBcnJheTxXb3Jrc2hlZXQ+KCk7XHJcbiAgICB0aGlzLl9vYmplY3RzID0gbmV3IEFycmF5PENvbnRyYWN0LkRhc2hib2FyZE9iamVjdD4oKTtcclxuXHJcbiAgICAvLyBQcm9jZXNzIGFsbCB0aGUgem9uZXMgd2hpY2ggYXJlIGNvbnRhaW5lZCBpbiB0aGlzIGRhc2hib2FyZFxyXG4gICAgZm9yIChjb25zdCB6b25lIG9mIHRoaXMuX2luZm8uem9uZXMpIHtcclxuICAgICAgbGV0IHdvcmtzaGVldDogV29ya3NoZWV0IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgY29uc3Qgem9uZVNpemUgPSBuZXcgU2l6ZSh6b25lLmhlaWdodCwgem9uZS53aWR0aCk7XHJcblxyXG4gICAgICBpZiAoem9uZS56b25lVHlwZSA9PT0gRGFzaGJvYXJkT2JqZWN0VHlwZS5Xb3Jrc2hlZXQpIHtcclxuICAgICAgICBjb25zdCBzaGVldEluZm8gPSBuZXcgU2hlZXRJbmZvSW1wbCh6b25lLm5hbWUsIENvbnRyYWN0LlNoZWV0VHlwZS5Xb3Jrc2hlZXQsIHpvbmVTaXplKTtcclxuICAgICAgICBjb25zdCB2aXpJZDogVmlzdWFsSWQgPSB7XHJcbiAgICAgICAgICB3b3Jrc2hlZXQ6IHpvbmUubmFtZSxcclxuICAgICAgICAgIGRhc2hib2FyZDogdGhpcy5faW5mby5uYW1lLFxyXG4gICAgICAgICAgc3Rvcnlib2FyZDogdGhpcy5fc2hlZXRQYXRoLnN0b3J5Ym9hcmQsXHJcbiAgICAgICAgICBmbGlwYm9hcmRab25lSUQ6IHRoaXMuX3NoZWV0UGF0aC5mbGlwYm9hcmRab25lSUQsXHJcbiAgICAgICAgICBzdG9yeVBvaW50SUQ6IHRoaXMuX3NoZWV0UGF0aC5zdG9yeVBvaW50SURcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCB3b3Jrc2hlZXRJbXBsID0gbmV3IFdvcmtzaGVldEltcGwoc2hlZXRJbmZvLCB2aXpJZCwgZGFzaGJvYXJkKTtcclxuICAgICAgICB3b3Jrc2hlZXQgPSBuZXcgV29ya3NoZWV0KHdvcmtzaGVldEltcGwpO1xyXG4gICAgICAgIHRoaXMuX3dvcmtzaGVldHMucHVzaCh3b3Jrc2hlZXQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCB6b25lUG9pbnQgPSBuZXcgUG9pbnQoem9uZS54LCB6b25lLnkpO1xyXG5cclxuICAgICAgY29uc3QgZGFzaGJvYXJkT2JqZWN0ID0gbmV3IERhc2hib2FyZE9iamVjdChcclxuICAgICAgICBkYXNoYm9hcmQsXHJcbiAgICAgICAgSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzLmRhc2hib2FyZE9iamVjdFR5cGUuY29udmVydCh6b25lLnpvbmVUeXBlKSxcclxuICAgICAgICB6b25lUG9pbnQsXHJcbiAgICAgICAgem9uZVNpemUsXHJcbiAgICAgICAgd29ya3NoZWV0XHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0aGlzLl9vYmplY3RzLnB1c2goZGFzaGJvYXJkT2JqZWN0KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL0ludGVybmFsL0Rhc2hib2FyZEltcGwudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktZXh0ZXJuYWwtY29udHJhY3QnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBkYXNoYm9hcmQgb2JqZWN0cyAtIHRoZSB6b25lcyBpbiBhIGRhc2hib2FyZC5cclxuICogVGhpcyBkb2VzIG5vdCBmb2xsb3cgdGhlIEltcGwgcGF0dGVybiBhcyBpdCBpcyBqdXN0IGEgcHJvcGVydHkgYmFnLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERhc2hib2FyZE9iamVjdCBpbXBsZW1lbnRzIENvbnRyYWN0LkRhc2hib2FyZE9iamVjdCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfZGFzaGJvYXJkOiBDb250cmFjdC5EYXNoYm9hcmQsXHJcbiAgICBwcml2YXRlIF90eXBlOiBDb250cmFjdC5EYXNoYm9hcmRPYmplY3RUeXBlLFxyXG4gICAgcHJpdmF0ZSBfcG9zaXRpb246IENvbnRyYWN0LlBvaW50LFxyXG4gICAgcHJpdmF0ZSBfc2l6ZTogQ29udHJhY3QuU2l6ZSxcclxuICAgIHByaXZhdGUgX3dvcmtzaGVldDogQ29udHJhY3QuV29ya3NoZWV0IHwgdW5kZWZpbmVkXHJcbiAgKSB7IH1cclxuXHJcbiAgcHVibGljIGdldCBkYXNoYm9hcmQoKTogQ29udHJhY3QuRGFzaGJvYXJkIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXNoYm9hcmQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHR5cGUoKTogQ29udHJhY3QuRGFzaGJvYXJkT2JqZWN0VHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdHlwZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgcG9zaXRpb24oKTogQ29udHJhY3QuUG9pbnQge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBzaXplKCk6IENvbnRyYWN0LlNpemUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHdvcmtzaGVldCgpOiBDb250cmFjdC5Xb3Jrc2hlZXQgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dvcmtzaGVldDtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL0Rhc2hib2FyZE9iamVjdC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgU2hlZXQgfSBmcm9tICcuL1NoZWV0JztcclxuXHJcbmltcG9ydCB7IFdvcmtzaGVldEltcGwgfSBmcm9tICcuL0ludGVybmFsL1dvcmtzaGVldEltcGwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdvcmtzaGVldCBleHRlbmRzIFNoZWV0IGltcGxlbWVudHMgQ29udHJhY3QuV29ya3NoZWV0IHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfd29ya3NoZWV0SW1wbDogV29ya3NoZWV0SW1wbCkge1xyXG4gICAgc3VwZXIoX3dvcmtzaGVldEltcGwpO1xyXG5cclxuICAgIC8vIENhbGwgdG8gaW5pdGlhbGl6ZSBldmVudHMgYW5kIHRoZW4gY2FsbCBkb3duIHRvIHRoZSBldmVudCBsaXN0ZW5lciBtYW5hZ2VyIHRvIGhhbmRsZSB0aGluZ3NcclxuICAgIHRoaXMuX3dvcmtzaGVldEltcGwuaW5pdGlhbGl6ZUV2ZW50cyh0aGlzKS5mb3JFYWNoKGUgPT4gdGhpcy5hZGROZXdFdmVudFR5cGUoZSkpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBwYXJlbnREYXNoYm9hcmQoKTogQ29udHJhY3QuRGFzaGJvYXJkIHtcclxuICAgIHJldHVybiB0aGlzLl93b3Jrc2hlZXRJbXBsLnBhcmVudERhc2hib2FyZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhcHBseUZpbHRlckFzeW5jKFxyXG4gICAgZmllbGROYW1lOiBzdHJpbmcsIHZhbHVlczogQXJyYXk8c3RyaW5nPiwgdXBkYXRlVHlwZTogQ29udHJhY3QuRmlsdGVyVXBkYXRlVHlwZSwgb3B0aW9uczogQ29udHJhY3QuRmlsdGVyT3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgIHJldHVybiB0aGlzLl93b3Jrc2hlZXRJbXBsLmFwcGx5RmlsdGVyQXN5bmMoZmllbGROYW1lLCB2YWx1ZXMsIHVwZGF0ZVR5cGUsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFwcGx5UmFuZ2VGaWx0ZXJBc3luYyhmaWVsZE5hbWU6IHN0cmluZywgZmlsdGVyT3B0aW9uczogQ29udHJhY3QuUmFuZ2VGaWx0ZXJPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIHJldHVybiB0aGlzLl93b3Jrc2hlZXRJbXBsLmFwcGx5UmFuZ2VGaWx0ZXJBc3luYyhmaWVsZE5hbWUsIGZpbHRlck9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyRmlsdGVyQXN5bmMoZmllbGROYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dvcmtzaGVldEltcGwuY2xlYXJGaWx0ZXJBc3luYyhmaWVsZE5hbWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEFuYWx5dGljT2JqZWN0c0FzeW5jKCk6IFByb21pc2U8QXJyYXk8Q29udHJhY3QuQW5hbHl0aWNzT2JqZWN0Pj4ge1xyXG4gICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5hcGlOb3RJbXBsZW1lbnRlZChbJ2dldEFuYWx5dGljT2JqZWN0c0FzeW5jJ10pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldERhdGFTb3VyY2VzQXN5bmMoKTogUHJvbWlzZTxBcnJheTxDb250cmFjdC5EYXRhU291cmNlPj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dvcmtzaGVldEltcGwuZ2V0RGF0YVNvdXJjZXNBc3luYygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEVuY29kaW5nc0FzeW5jKCk6IFByb21pc2U8QXJyYXk8Q29udHJhY3QuRW5jb2Rpbmc+PiB7XHJcbiAgICB0aHJvdyBUYWJsZWF1RXhjZXB0aW9uLmFwaU5vdEltcGxlbWVudGVkKFsnZ2V0RW5jb2RpbmdzQXN5bmMnXSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RmlsdGVyc0FzeW5jKCk6IFByb21pc2U8Q29udHJhY3QuRmlsdGVyW10+IHtcclxuICAgIHJldHVybiB0aGlzLl93b3Jrc2hlZXRJbXBsLmdldEZpbHRlcnNBc3luYygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFNlbGVjdGVkTWFya3NBc3luYygpOiBQcm9taXNlPENvbnRyYWN0Lk1hcmtzQ29sbGVjdGlvbj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dvcmtzaGVldEltcGwuZ2V0U2VsZWN0ZWRNYXJrc0FzeW5jKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0SGlnaGxpZ2h0ZWRNYXJrc0FzeW5jKCk6IFByb21pc2U8Q29udHJhY3QuTWFya3NDb2xsZWN0aW9uPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fd29ya3NoZWV0SW1wbC5nZXRIaWdobGlnaHRlZE1hcmtzQXN5bmMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTdW1tYXJ5RGF0YUFzeW5jKG9wdGlvbnM6IENvbnRyYWN0LkdldFN1bW1hcnlEYXRhT3B0aW9ucyk6IFByb21pc2U8Q29udHJhY3QuRGF0YVRhYmxlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fd29ya3NoZWV0SW1wbC5nZXRTdW1tYXJ5RGF0YUFzeW5jKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFVuZGVybHlpbmdEYXRhQXN5bmMob3B0aW9uczogQ29udHJhY3QuR2V0VW5kZXJseWluZ0RhdGFPcHRpb25zKTogUHJvbWlzZTxDb250cmFjdC5EYXRhVGFibGU+IHtcclxuICAgIHJldHVybiB0aGlzLl93b3Jrc2hlZXRJbXBsLmdldFVuZGVybHlpbmdEYXRhQXN5bmMob3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXJTZWxlY3RlZE1hcmtzQXN5bmMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fd29ya3NoZWV0SW1wbC5jbGVhclNlbGVjdGVkTWFya3NBc3luYygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdE1hcmtzQnlJREFzeW5jKG1hcmtzSW5mbzogQXJyYXk8Q29udHJhY3QuTWFya0luZm8+LCB1cGRhdGVUeXBlOiBDb250cmFjdC5TZWxlY3Rpb25VcGRhdGVUeXBlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fd29ya3NoZWV0SW1wbC5zZWxlY3RNYXJrc0J5SWRBc3luYyhtYXJrc0luZm8sIHVwZGF0ZVR5cGUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbGVjdE1hcmtzQnlWYWx1ZUFzeW5jKHNlbGVjdGlvbnM6IEFycmF5PENvbnRyYWN0LlNlbGVjdGlvbkNyaXRlcmlhPixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uVXBkYXRlVHlwZTogQ29udHJhY3QuU2VsZWN0aW9uVXBkYXRlVHlwZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dvcmtzaGVldEltcGwuc2VsZWN0TWFya3NCeVZhbHVlQXN5bmMoc2VsZWN0aW9ucywgc2VsZWN0aW9uVXBkYXRlVHlwZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VsZWN0TWFya3NCeUlkQXN5bmMoc2VsZWN0aW9uczogQXJyYXk8Q29udHJhY3QuTWFya0luZm8+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25VcGRhdGVUeXBlOiBDb250cmFjdC5TZWxlY3Rpb25VcGRhdGVUeXBlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fd29ya3NoZWV0SW1wbC5zZWxlY3RNYXJrc0J5SWRBc3luYyhzZWxlY3Rpb25zLCBzZWxlY3Rpb25VcGRhdGVUeXBlKTtcclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vc3JjL1dvcmtzaGVldC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5pbXBvcnQgeyBTaGVldFBhdGggfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVnaXN0cnksIFBhcmFtZXRlcnNTZXJ2aWNlLCBTZXJ2aWNlTmFtZXMgfSBmcm9tICdAdGFibGVhdS9hcGktc2hhcmVkJztcclxuXHJcbmltcG9ydCB7IFNoZWV0SW5mb0ltcGwgfSBmcm9tICcuL1NoZWV0SW5mb0ltcGwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNoZWV0SW1wbCB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NoZWV0SW5mb0ltcGw6IFNoZWV0SW5mb0ltcGwpIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NoZWV0SW5mb0ltcGwubmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2hlZXRUeXBlKCk6IENvbnRyYWN0LlNoZWV0VHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hlZXRJbmZvSW1wbC5zaGVldFR5cGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNoZWV0UGF0aCgpOiBTaGVldFBhdGgge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NoZWV0SW5mb0ltcGwuc2hlZXRQYXRoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBzaXplKCk6IENvbnRyYWN0LlNpemUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NoZWV0SW5mb0ltcGwuc2hlZXRTaXplO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGZpbmRQYXJhbWV0ZXJBc3luYyhwYXJhbWV0ZXJOYW1lOiBzdHJpbmcsIHNoZWV0OiBDb250cmFjdC5TaGVldCk6IFByb21pc2U8Q29udHJhY3QuUGFyYW1ldGVyIHwgdW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8UGFyYW1ldGVyc1NlcnZpY2U+KFNlcnZpY2VOYW1lcy5QYXJhbWV0ZXJzKTtcclxuICAgIHJldHVybiBzZXJ2aWNlLmZpbmRQYXJhbWV0ZXJCeU5hbWVBc3luYyhwYXJhbWV0ZXJOYW1lLCBzaGVldCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UGFyYW1ldGVyc0FzeW5jKHNoZWV0OiBDb250cmFjdC5TaGVldCk6IFByb21pc2U8QXJyYXk8Q29udHJhY3QuUGFyYW1ldGVyPj4ge1xyXG4gICAgY29uc3Qgc2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPFBhcmFtZXRlcnNTZXJ2aWNlPihTZXJ2aWNlTmFtZXMuUGFyYW1ldGVycyk7XHJcbiAgICByZXR1cm4gc2VydmljZS5nZXRQYXJhbWV0ZXJzRm9yU2hlZXRBc3luYyh0aGlzLnNoZWV0UGF0aCwgc2hlZXQpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvSW50ZXJuYWwvU2hlZXRJbXBsLnRzXG4gKiovIiwiaW1wb3J0IHsgU2hlZXRUeXBlLCBTaXplIH0gZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgU2hlZXRQYXRoIH0gZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBTaGVldEluZm9JbXBsIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmcsXHJcbiAgICBwcml2YXRlIF9zaGVldFR5cGU6IFNoZWV0VHlwZSxcclxuICAgIHByaXZhdGUgX3NoZWV0U2l6ZTogU2l6ZVxyXG4gICkgeyB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNoZWV0U2l6ZSgpOiBTaXplIHtcclxuICAgIHJldHVybiB0aGlzLl9zaGVldFNpemU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNoZWV0VHlwZSgpOiBTaGVldFR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NoZWV0VHlwZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2hlZXRQYXRoKCk6IFNoZWV0UGF0aCB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzaGVldE5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgaXNEYXNoYm9hcmQ6IHRoaXMuc2hlZXRUeXBlID09PSBTaGVldFR5cGUuRGFzaGJvYXJkXHJcbiAgICAgIC8vIFRPRE8gLSBTdG9yaWVzXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvSW50ZXJuYWwvU2hlZXRJbmZvSW1wbC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7XHJcbiAgRGF0YVNjaGVtYSxcclxuICBEYXRhU291cmNlIGFzIERhdGFTb3VyY2VJbmZvLFxyXG4gIEZpbHRlckV2ZW50LCBOb3RpZmljYXRpb25JZCxcclxuICBWaXN1YWxJZCxcclxuICBXb3Jrc2hlZXREYXRhU291cmNlSW5mb1xyXG59IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcblxyXG5pbXBvcnQge1xyXG4gIEFwaVNlcnZpY2VSZWdpc3RyeSxcclxuICBEYXRhU291cmNlU2VydmljZSxcclxuICBGaWx0ZXJDaGFuZ2VkRXZlbnQsXHJcbiAgRmlsdGVyU2VydmljZSxcclxuICBHZXREYXRhU2VydmljZSxcclxuICBHZXREYXRhVHlwZSxcclxuICBNYXJrc1NlbGVjdGVkRXZlbnQsXHJcbiAgTm90aWZpY2F0aW9uU2VydmljZSxcclxuICBTZWxlY3Rpb25TZXJ2aWNlLFxyXG4gIFNlcnZpY2VOYW1lcyxcclxuICBTaW5nbGVFdmVudE1hbmFnZXIsXHJcbiAgU2luZ2xlRXZlbnRNYW5hZ2VySW1wbFxyXG59IGZyb20gJ0B0YWJsZWF1L2FwaS1zaGFyZWQnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL0RhdGFTb3VyY2UnO1xyXG5pbXBvcnQgeyBXb3Jrc2hlZXQgfSBmcm9tICcuLi9Xb3Jrc2hlZXQnO1xyXG5cclxuaW1wb3J0IHsgRGF0YVNvdXJjZUltcGwgfSBmcm9tICcuL0RhdGFTb3VyY2VJbXBsJztcclxuaW1wb3J0IHsgU2hlZXRJbXBsIH0gZnJvbSAnLi9TaGVldEltcGwnO1xyXG5pbXBvcnQgeyBTaGVldEluZm9JbXBsIH0gZnJvbSAnLi9TaGVldEluZm9JbXBsJztcclxuXHJcbmNvbnN0IHZpc3VhbElkc0FyZUVxdWFsID0gZnVuY3Rpb24oYTogVmlzdWFsSWQsIGI6IFZpc3VhbElkKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGEgJiYgYiAmJlxyXG4gICAgYS53b3Jrc2hlZXQgPT09IGIud29ya3NoZWV0ICYmXHJcbiAgICBhLmRhc2hib2FyZCA9PT0gYi5kYXNoYm9hcmQgJiZcclxuICAgIGEuc3Rvcnlib2FyZCA9PT0gYi5zdG9yeWJvYXJkICYmXHJcbiAgICBhLnN0b3J5UG9pbnRJRCA9PT0gYi5zdG9yeVBvaW50SUQgJiZcclxuICAgIGEuZmxpcGJvYXJkWm9uZUlEID09PSBiLmZsaXBib2FyZFpvbmVJRDtcclxufTtcclxuXHJcbmV4cG9ydCBjbGFzcyBXb3Jrc2hlZXRJbXBsIGV4dGVuZHMgU2hlZXRJbXBsIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3Ioc2hlZXRJbmZvSW1wbDogU2hlZXRJbmZvSW1wbCxcclxuICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBfdmlzdWFsSWQ6IFZpc3VhbElkLFxyXG4gICAgICAgICAgICAgICAgICAgICBwcml2YXRlIF9wYXJlbnREYXNoYm9hcmQ6IENvbnRyYWN0LkRhc2hib2FyZCkge1xyXG4gICAgc3VwZXIoc2hlZXRJbmZvSW1wbCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHBhcmVudERhc2hib2FyZCgpOiBDb250cmFjdC5EYXNoYm9hcmQge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudERhc2hib2FyZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhlbHBlciBtZXRob2Qgd2hpY2ggZ29lcyB0aHJvdWdoIGFuZCByZWdpc3RlcnMgZWFjaCBldmVudCB0eXBlIHRoaXMgaW1wbCBrbm93cyBhYm91dFxyXG4gICAqIHdpdGggdGhlIE5vdGlmaWNhdGlvblNlcnZpY2UuIEl0IHJldHVybnMgYW4gYXJyYXkgb2YgU2luZ2xlRXZlbnRNYW5hZ2VyIG9iamVjdHMgd2hpY2hcclxuICAgKiBjYW4gdGhlbiBiZSBwYXNzZWQgdG8gYW4gRXZlbnRMaXN0ZW5lck1hbmFnZXIgdG8gaGFuZGxlIHVzZXIgcmVnaXN0cmF0aW9uIC8gdW5yZWdpc3RyYXRpb24uXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1dvcmtzaGVldH0gd29ya3NoZWV0IFRoZSB3b3Jrc2hlZXQgb2JqZWN0IHdoaWNoIHdpbGwgYmUgaW5jbHVkZWQgd2l0aCB0aGUgZXZlbnQgbm90aWZpY2F0aW9uc1xyXG4gICAqIEByZXR1cm5zIHtBcnJheTxTaW5nbGVFdmVudE1hbmFnZXI+fSBDb2xsZWN0aW9uIG9mIGV2ZW50IG1hbmFnZXJzIHRvIHBhc3MgdG8gYW4gRXZlbnRMaXN0ZW5lck1hbmFnZXJcclxuICAgKi9cclxuICBwdWJsaWMgaW5pdGlhbGl6ZUV2ZW50cyh3b3Jrc2hlZXQ6IFdvcmtzaGVldCk6IEFycmF5PFNpbmdsZUV2ZW50TWFuYWdlcj4ge1xyXG4gICAgY29uc3QgcmVzdWx0cyA9IG5ldyBBcnJheTxTaW5nbGVFdmVudE1hbmFnZXI+KCk7XHJcbiAgICBsZXQgbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBub3RpZmljYXRpb25TZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8Tm90aWZpY2F0aW9uU2VydmljZT4oU2VydmljZU5hbWVzLk5vdGlmaWNhdGlvbik7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIC8vIElmIHdlIGRvbid0IGhhdmUgdGhpcyBzZXJ2aWNlIHJlZ2lzdGVyZWQsIGp1c3QgcmV0dXJuXHJcbiAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluaXRpYWxpemUgYWxsIG9mIHRoZSBldmVudCBtYW5hZ2VycyB3ZSdsbCBuZWVkIChvbmUgZm9yIGVhY2ggZXZlbnQgdHlwZSlcclxuICAgIGNvbnN0IG1hcmtzRXZlbnQgPSBuZXcgU2luZ2xlRXZlbnRNYW5hZ2VySW1wbDxNYXJrc1NlbGVjdGVkRXZlbnQ+KENvbnRyYWN0LlRhYmxlYXVFdmVudFR5cGUuTWFya1NlbGVjdGlvbkNoYW5nZWQpO1xyXG4gICAgbm90aWZpY2F0aW9uU2VydmljZS5yZWdpc3RlckhhbmRsZXIoTm90aWZpY2F0aW9uSWQuU2VsZWN0ZWRNYXJrc0NoYW5nZWQsIChtb2RlbCkgPT4ge1xyXG4gICAgICBjb25zdCB2aXN1YWxJZCA9IG1vZGVsIGFzIFZpc3VhbElkO1xyXG4gICAgICByZXR1cm4gdmlzdWFsSWRzQXJlRXF1YWwodmlzdWFsSWQsIHRoaXMudmlzdWFsSWQpO1xyXG4gICAgfSwgKHZpejogVmlzdWFsSWQpID0+IHtcclxuICAgICAgbWFya3NFdmVudC50cmlnZ2VyRXZlbnQoKCkgPT4gbmV3IE1hcmtzU2VsZWN0ZWRFdmVudCh3b3Jrc2hlZXQpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGZpbHRlckV2ZW50ID0gbmV3IFNpbmdsZUV2ZW50TWFuYWdlckltcGw8RmlsdGVyQ2hhbmdlZEV2ZW50PihDb250cmFjdC5UYWJsZWF1RXZlbnRUeXBlLkZpbHRlckNoYW5nZWQpO1xyXG4gICAgbm90aWZpY2F0aW9uU2VydmljZS5yZWdpc3RlckhhbmRsZXIoTm90aWZpY2F0aW9uSWQuRmlsdGVyQ2hhbmdlZCwgKG1vZGVsKSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpbHRlckV2ZW50UmVzcG9uc2UgPSBtb2RlbCBhcyBGaWx0ZXJFdmVudDtcclxuICAgICAgcmV0dXJuIHRoaXMudmlzdWFsSWQud29ya3NoZWV0ID09PSBmaWx0ZXJFdmVudFJlc3BvbnNlLnZpc3VhbElkLndvcmtzaGVldDtcclxuICAgIH0sIChldmVudDogRmlsdGVyRXZlbnQpID0+IHtcclxuICAgICAgZmlsdGVyRXZlbnQudHJpZ2dlckV2ZW50KCgpID0+IG5ldyBGaWx0ZXJDaGFuZ2VkRXZlbnQod29ya3NoZWV0LCBldmVudC5maWVsZE5hbWUpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJlc3VsdHMucHVzaChtYXJrc0V2ZW50KTtcclxuICAgIHJlc3VsdHMucHVzaChmaWx0ZXJFdmVudCk7XHJcblxyXG4gICAgLy8gVE9ETyAtIG90aGVyIGV2ZW50IHR5cGVzXHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHZpc3VhbElkKCk6IFZpc3VhbElkIHtcclxuICAgIHJldHVybiB0aGlzLl92aXN1YWxJZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhcHBseUZpbHRlckFzeW5jKFxyXG4gICAgZmllbGROYW1lOiBzdHJpbmcsIHZhbHVlczogQXJyYXk8c3RyaW5nPiwgdXBkYXRlVHlwZTogQ29udHJhY3QuRmlsdGVyVXBkYXRlVHlwZSwgb3B0aW9uczogQ29udHJhY3QuRmlsdGVyT3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgIGNvbnN0IHNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxGaWx0ZXJTZXJ2aWNlPihTZXJ2aWNlTmFtZXMuRmlsdGVyKTtcclxuICAgICAgcmV0dXJuIHNlcnZpY2UuYXBwbHlGaWx0ZXJBc3luYyh0aGlzLnZpc3VhbElkLCBmaWVsZE5hbWUsIHZhbHVlcywgdXBkYXRlVHlwZSwgb3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gIHB1YmxpYyBhcHBseVJhbmdlRmlsdGVyQXN5bmMoZmllbGROYW1lOiBzdHJpbmcsIGZpbHRlck9wdGlvbnM6IENvbnRyYWN0LlJhbmdlRmlsdGVyT3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8RmlsdGVyU2VydmljZT4oU2VydmljZU5hbWVzLkZpbHRlcik7XHJcbiAgICByZXR1cm4gc2VydmljZS5hcHBseVJhbmdlRmlsdGVyQXN5bmModGhpcy52aXN1YWxJZCwgZmllbGROYW1lLCBmaWx0ZXJPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbGVhckZpbHRlckFzeW5jKGZpZWxkTmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxGaWx0ZXJTZXJ2aWNlPihTZXJ2aWNlTmFtZXMuRmlsdGVyKTtcclxuICAgIHJldHVybiBzZXJ2aWNlLmNsZWFyRmlsdGVyQXN5bmModGhpcy52aXN1YWxJZCwgZmllbGROYW1lKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXREYXRhU291cmNlc0FzeW5jKCk6IFByb21pc2U8QXJyYXk8Q29udHJhY3QuRGF0YVNvdXJjZT4+IHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxEYXRhU291cmNlU2VydmljZT4oU2VydmljZU5hbWVzLkRhdGFTb3VyY2VTZXJ2aWNlKTtcclxuXHJcbiAgICByZXR1cm4gc2VydmljZS5nZXREYXRhU291cmNlc0FzeW5jKCkudGhlbjxBcnJheTxDb250cmFjdC5EYXRhU291cmNlPj4ocmVzdWx0ID0+IHtcclxuICAgICAgY29uc3QgZGF0YVNjaGVtYTogRGF0YVNjaGVtYSA9IHJlc3VsdCBhcyBEYXRhU2NoZW1hO1xyXG4gICAgICBjb25zdCB3b3Jrc2hlZXREYXRhU291cmNlSW5mbzogV29ya3NoZWV0RGF0YVNvdXJjZUluZm8gPSBkYXRhU2NoZW1hLndvcmtzaGVldERhdGFTY2hlbWFNYXBbdGhpcy5uYW1lXTtcclxuXHJcbiAgICAgIGxldCBkYXRhU291cmNlczogQXJyYXk8Q29udHJhY3QuRGF0YVNvdXJjZT4gPSBbXTtcclxuXHJcbiAgICAgIC8vIEZpcnN0LCBhZGQgdGhlIHByaW1hcnkgZGF0YXNvdXJjZS4gIEJ5IGNvbnZlbnRpb24sIGl0IGNvbWVzIGZpcnN0IGluIHRoZSByZXR1cm5lZCBhcnJheS5cclxuICAgICAgbGV0IHByaW1hcnlJZDogc3RyaW5nID0gd29ya3NoZWV0RGF0YVNvdXJjZUluZm8ucHJpbWFyeURhdGFTb3VyY2U7XHJcbiAgICAgIGRhdGFTb3VyY2VzLnB1c2godGhpcy5jcmVhdGVEYXRhU291cmNlRnJvbUluZm8oZGF0YVNjaGVtYS5kYXRhU291cmNlc1twcmltYXJ5SWRdKSk7XHJcblxyXG4gICAgICAvLyBUaGVuLCBsb29wIHRocm91Z2ggYW55IHNlY29uZGFyeSBkYXRhIHNvdXJjZXMgYW5kIGFkZCB0aGVtLlxyXG4gICAgICBmb3IgKGxldCBzZWNvbmRhcnlJZCBvZiB3b3Jrc2hlZXREYXRhU291cmNlSW5mby5yZWZlcmVuY2VkRGF0YVNvdXJjZUxpc3QpIHtcclxuICAgICAgICBpZiAoc2Vjb25kYXJ5SWQgIT09IHByaW1hcnlJZCkge1xyXG4gICAgICAgICAgZGF0YVNvdXJjZXMucHVzaCh0aGlzLmNyZWF0ZURhdGFTb3VyY2VGcm9tSW5mbyhkYXRhU2NoZW1hLmRhdGFTb3VyY2VzW3NlY29uZGFyeUlkXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGRhdGFTb3VyY2VzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RmlsdGVyc0FzeW5jKCk6IFByb21pc2U8Q29udHJhY3QuRmlsdGVyW10+IHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxGaWx0ZXJTZXJ2aWNlPihTZXJ2aWNlTmFtZXMuRmlsdGVyKTtcclxuICAgIHJldHVybiBzZXJ2aWNlLmdldEZpbHRlcnNBc3luYyh0aGlzLnZpc3VhbElkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTZWxlY3RlZE1hcmtzQXN5bmMoKTogUHJvbWlzZTxDb250cmFjdC5NYXJrc0NvbGxlY3Rpb24+IHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxHZXREYXRhU2VydmljZT4oU2VydmljZU5hbWVzLkdldERhdGEpO1xyXG4gICAgcmV0dXJuIHNlcnZpY2UuZ2V0U2VsZWN0ZWRNYXJrc0FzeW5jKHRoaXMudmlzdWFsSWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEhpZ2hsaWdodGVkTWFya3NBc3luYygpOiBQcm9taXNlPENvbnRyYWN0Lk1hcmtzQ29sbGVjdGlvbj4ge1xyXG4gICAgY29uc3Qgc2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPEdldERhdGFTZXJ2aWNlPihTZXJ2aWNlTmFtZXMuR2V0RGF0YSk7XHJcbiAgICByZXR1cm4gc2VydmljZS5nZXRIaWdobGlnaHRlZE1hcmtzQXN5bmModGhpcy52aXN1YWxJZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0U3VtbWFyeURhdGFBc3luYyhvcHRpb25zOiBDb250cmFjdC5HZXRTdW1tYXJ5RGF0YU9wdGlvbnMpOiBQcm9taXNlPENvbnRyYWN0LkRhdGFUYWJsZT4ge1xyXG4gICAgY29uc3Qgc2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPEdldERhdGFTZXJ2aWNlPihTZXJ2aWNlTmFtZXMuR2V0RGF0YSk7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICByZXR1cm4gc2VydmljZS5nZXRVbmRlcmx5aW5nRGF0YUFzeW5jKFxyXG4gICAgICB0aGlzLnZpc3VhbElkLCBHZXREYXRhVHlwZS5TdW1tYXJ5LCAhIW9wdGlvbnMuaWdub3JlQWxpYXNlcywgISFvcHRpb25zLmlnbm9yZVNlbGVjdGlvbiwgdHJ1ZSwgMCk7XHJcbiAgICB9XHJcblxyXG4gIHB1YmxpYyBnZXRVbmRlcmx5aW5nRGF0YUFzeW5jKG9wdGlvbnM6IENvbnRyYWN0LkdldFVuZGVybHlpbmdEYXRhT3B0aW9ucyk6IFByb21pc2U8Q29udHJhY3QuRGF0YVRhYmxlPiB7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8R2V0RGF0YVNlcnZpY2U+KFNlcnZpY2VOYW1lcy5HZXREYXRhKTtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgcmV0dXJuIHNlcnZpY2UuZ2V0VW5kZXJseWluZ0RhdGFBc3luYyhcclxuICAgICAgdGhpcy52aXN1YWxJZCxcclxuICAgICAgR2V0RGF0YVR5cGUuVW5kZXJseWluZyxcclxuICAgICAgISFvcHRpb25zLmlnbm9yZUFsaWFzZXMsXHJcbiAgICAgICEhb3B0aW9ucy5pZ25vcmVTZWxlY3Rpb24sXHJcbiAgICAgICEhb3B0aW9ucy5pbmNsdWRlQWxsQ29sdW1ucyxcclxuICAgICAgb3B0aW9ucy5tYXhSb3dzIHx8IDApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyU2VsZWN0ZWRNYXJrc0FzeW5jKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3Qgc2VydmljZSA9IEFwaVNlcnZpY2VSZWdpc3RyeS5pbnN0YW5jZS5nZXRTZXJ2aWNlPFNlbGVjdGlvblNlcnZpY2U+KFNlcnZpY2VOYW1lcy5TZWxlY3Rpb24pO1xyXG4gICAgcmV0dXJuIHNlcnZpY2UuY2xlYXJTZWxlY3RlZE1hcmtzQXN5bmModGhpcy52aXN1YWxJZCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VsZWN0TWFya3NCeVZhbHVlQXN5bmMoc2VsZWN0aW9uczogQXJyYXk8Q29udHJhY3QuU2VsZWN0aW9uQ3JpdGVyaWE+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25VcGRhdGVUeXBlOiBDb250cmFjdC5TZWxlY3Rpb25VcGRhdGVUeXBlKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBzZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8U2VsZWN0aW9uU2VydmljZT4oU2VydmljZU5hbWVzLlNlbGVjdGlvbik7XHJcbiAgICByZXR1cm4gc2VydmljZS5zZWxlY3RNYXJrc0J5VmFsdWVBc3luYyh0aGlzLnZpc3VhbElkLCBzZWxlY3Rpb25zLCBzZWxlY3Rpb25VcGRhdGVUeXBlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RNYXJrc0J5SWRBc3luYyhzZWxlY3Rpb25zOiBBcnJheTxDb250cmFjdC5NYXJrSW5mbz4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblVwZGF0ZVR5cGU6IENvbnRyYWN0LlNlbGVjdGlvblVwZGF0ZVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxTZWxlY3Rpb25TZXJ2aWNlPihTZXJ2aWNlTmFtZXMuU2VsZWN0aW9uKTtcclxuICAgIHJldHVybiBzZXJ2aWNlLnNlbGVjdE1hcmtzQnlJZEFzeW5jKHRoaXMudmlzdWFsSWQsIHNlbGVjdGlvbnMsIHNlbGVjdGlvblVwZGF0ZVR5cGUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVEYXRhU291cmNlRnJvbUluZm8oZGF0YVNvdXJjZUluZm86IERhdGFTb3VyY2VJbmZvKTogQ29udHJhY3QuRGF0YVNvdXJjZSB7XHJcbiAgICBjb25zdCBkYXRhU291cmNlSW1wbCA9IG5ldyBEYXRhU291cmNlSW1wbChkYXRhU291cmNlSW5mbyk7XHJcbiAgICBjb25zdCBkYXRhU291cmNlID0gbmV3IERhdGFTb3VyY2UoZGF0YVNvdXJjZUltcGwpO1xyXG4gICAgZGF0YVNvdXJjZUltcGwuaW5pdGlhbGl6ZVdpdGhQdWJsaWNJbnRlcmZhY2VzKGRhdGFTb3VyY2UpO1xyXG4gICAgcmV0dXJuIGRhdGFTb3VyY2U7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9JbnRlcm5hbC9Xb3Jrc2hlZXRJbXBsLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2VJbXBsIH0gZnJvbSAnLi9JbnRlcm5hbC9EYXRhU291cmNlSW1wbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YVNvdXJjZSBpbXBsZW1lbnRzIENvbnRyYWN0LkRhdGFTb3VyY2Uge1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kYXRhU291cmNlSW1wbDogRGF0YVNvdXJjZUltcGwpIHsgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlSW1wbC5uYW1lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VJbXBsLmlkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBmaWVsZHMoKTogQ29udHJhY3QuRmllbGRbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZUltcGwuZmllbGRzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBleHRyYWN0VXBkYXRlVGltZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VJbXBsLmV4dHJhY3RVcGRhdGVUaW1lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc0V4dHJhY3QoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZUltcGwuaXNFeHRyYWN0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZnJlc2hBc3luYygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlSW1wbC5yZWZyZXNoQXN5bmMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRBY3RpdmVUYWJsZXNBc3luYygpOiBQcm9taXNlPENvbnRyYWN0LlRhYmxlU3VtbWFyeVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZUltcGwuZ2V0QWN0aXZlVGFibGVzQXN5bmMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDb25uZWN0aW9uU3VtbWFyaWVzQXN5bmMoKTogUHJvbWlzZTxDb250cmFjdC5Db25uZWN0aW9uU3VtbWFyeVtdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZUltcGwuZ2V0Q29ubmVjdGlvblN1bW1hcmllc0FzeW5jKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VW5kZXJseWluZ0RhdGFBc3luYyhvcHRpb25zPzogQ29udHJhY3QuRGF0YVNvdXJjZVVuZGVybHlpbmdEYXRhT3B0aW9ucyk6XHJcbiAgICBQcm9taXNlPENvbnRyYWN0LkRhdGFUYWJsZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VJbXBsLmdldFVuZGVybHlpbmdEYXRhQXN5bmMob3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9EYXRhU291cmNlLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0ICogYXMgSW50ZXJuYWxDb250cmFjdCBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVnaXN0cnksIERhdGFTb3VyY2VTZXJ2aWNlLCBHZXREYXRhU2VydmljZSwgU2VydmljZU5hbWVzIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXNoYXJlZCc7XHJcbmltcG9ydCB7IFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRmllbGRJbXBsIH0gZnJvbSAnLi9GaWVsZEltcGwnO1xyXG5cclxuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9GaWVsZCc7XHJcbmltcG9ydCB7IFRhYmxlU3VtbWFyeSB9IGZyb20gJy4uL1RhYmxlU3VtbWFyeSc7XHJcblxyXG5leHBvcnQgY2xhc3MgRGF0YVNvdXJjZUltcGwge1xyXG4gIHByaXZhdGUgX2ZpZWxkczogRmllbGRbXTtcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGFTb3VyY2VJbmZvOiBJbnRlcm5hbENvbnRyYWN0LkRhdGFTb3VyY2UpIHtcclxuICAgIHRoaXMuX2ZpZWxkcyA9IF9kYXRhU291cmNlSW5mby5maWVsZHMubWFwKGZpZWxkTW9kZWwgPT4ge1xyXG4gICAgICBjb25zdCBmaWVsZEltcGwgPSBuZXcgRmllbGRJbXBsKGZpZWxkTW9kZWwsIHRoaXMpO1xyXG4gICAgICByZXR1cm4gbmV3IEZpZWxkKGZpZWxkSW1wbCk7XHJcbiAgICB9KTtcclxuICAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9kYXRhU291cmNlSW5mby5uYW1lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VJbmZvLmlkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBleHRyYWN0VXBkYXRlVGltZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2VJbmZvLmV4dHJhY3RVcGRhdGVUaW1lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBmaWVsZHMoKTogQ29udHJhY3QuRmllbGRbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc0V4dHJhY3QoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZUluZm8uaXNFeHRyYWN0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlZnJlc2hBc3luYygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGRhdGFTb3VyY2VTZXJ2aWNlID0gQXBpU2VydmljZVJlZ2lzdHJ5Lmluc3RhbmNlLmdldFNlcnZpY2U8RGF0YVNvdXJjZVNlcnZpY2U+KFxyXG4gICAgICBTZXJ2aWNlTmFtZXMuRGF0YVNvdXJjZVNlcnZpY2UpO1xyXG5cclxuICAgIHJldHVybiBkYXRhU291cmNlU2VydmljZS5yZWZyZXNoQXN5bmModGhpcy5fZGF0YVNvdXJjZUluZm8uaWQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENvbm5lY3Rpb25TdW1tYXJpZXNBc3luYygpOiBQcm9taXNlPENvbnRyYWN0LkNvbm5lY3Rpb25TdW1tYXJ5W10+IHtcclxuICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uYXBpTm90SW1wbGVtZW50ZWQoWydEYXRhU291cmNlIGNvbm5lY3Rpb25TdW1tYXJpZXMnXSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0QWN0aXZlVGFibGVzQXN5bmMoKTogUHJvbWlzZTxDb250cmFjdC5UYWJsZVN1bW1hcnlbXT4ge1xyXG4gICAgY29uc3QgZGF0YVNvdXJjZVNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxEYXRhU291cmNlU2VydmljZT4oXHJcbiAgICAgIFNlcnZpY2VOYW1lcy5EYXRhU291cmNlU2VydmljZSk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGFTb3VyY2VTZXJ2aWNlLmdldEFjdGl2ZVRhYmxlc0FzeW5jKHRoaXMuX2RhdGFTb3VyY2VJbmZvLmlkKS50aGVuPENvbnRyYWN0LlRhYmxlU3VtbWFyeVtdPih0YWJsZUluZm9zID0+IHtcclxuICAgICAgcmV0dXJuIHRhYmxlSW5mb3MubWFwKHRhYmxlSW5mbyA9PiBuZXcgVGFibGVTdW1tYXJ5KHRhYmxlSW5mbykpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VW5kZXJseWluZ0RhdGFBc3luYyhvcHRpb25zPzogQ29udHJhY3QuRGF0YVNvdXJjZVVuZGVybHlpbmdEYXRhT3B0aW9ucyk6XHJcbiAgICBQcm9taXNlPENvbnRyYWN0LkRhdGFUYWJsZT4ge1xyXG4gICAgICBjb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgICAgICAgIGlnbm9yZUFsaWFzZXM6IGZhbHNlLFxyXG4gICAgICAgICAgbWF4Um93czogMTAwMDAsXHJcbiAgICAgICAgICBjb2x1bW5zVG9JbmNsdWRlOiBbXSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICAgICAgY29uc3QgZ2V0RGF0YVNlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxHZXREYXRhU2VydmljZT4oU2VydmljZU5hbWVzLkdldERhdGEpO1xyXG4gICAgICByZXR1cm4gZ2V0RGF0YVNlcnZpY2UuZ2V0RGF0YVNvdXJjZURhdGFBc3luYyhcclxuICAgICAgICB0aGlzLmlkLFxyXG4gICAgICAgICEhb3B0aW9ucy5pZ25vcmVBbGlhc2VzLFxyXG4gICAgICAgIG9wdGlvbnMubWF4Um93cyB8fCBkZWZhdWx0T3B0aW9ucy5tYXhSb3dzLFxyXG4gICAgICAgIG9wdGlvbnMuY29sdW1uc1RvSW5jbHVkZSB8fCBkZWZhdWx0T3B0aW9ucy5jb2x1bW5zVG9JbmNsdWRlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0aWFsaXplV2l0aFB1YmxpY0ludGVyZmFjZXMoZGF0YVNvdXJjZTogQ29udHJhY3QuRGF0YVNvdXJjZSk6IHZvaWQge1xyXG4gICAgdGhpcy5fZmllbGRzID0gdGhpcy5fZGF0YVNvdXJjZUluZm8uZmllbGRzLm1hcChmaWVsZE1vZGVsID0+IHtcclxuICAgICAgY29uc3QgZmllbGRJbXBsID0gbmV3IEZpZWxkSW1wbChmaWVsZE1vZGVsLCBkYXRhU291cmNlKTtcclxuICAgICAgcmV0dXJuIG5ldyBGaWVsZChmaWVsZEltcGwpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9JbnRlcm5hbC9EYXRhU291cmNlSW1wbC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCAqIGFzIEludGVybmFsQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWludGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzIH0gZnJvbSAnQHRhYmxlYXUvYXBpLXNoYXJlZCc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmllbGRJbXBsIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfZmllbGRJbmZvOiBJbnRlcm5hbENvbnRyYWN0LkZpZWxkLFxyXG4gICAgICAgICAgICAgICAgICAgICBwcml2YXRlIF9wYXJlbnREYXRhU291cmNlOiBDb250cmFjdC5EYXRhU291cmNlKSB7ICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkSW5mby5uYW1lO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkSW5mby5pZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZGVzY3JpcHRpb24oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZEluZm8uZGVzY3JpcHRpb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGFnZ3JlZ2F0aW9uKCk6IENvbnRyYWN0LkZpZWxkQWdncmVnYXRpb25UeXBlIHtcclxuICAgIHJldHVybiBJbnRlcm5hbFRvRXh0ZXJuYWxFbnVtTWFwcGluZ3MuZmllbGRBZ2dyZWdhdGlvblR5cGUuY29udmVydCh0aGlzLl9maWVsZEluZm8uYWdncmVnYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBkYXRhU291cmNlKCk6IENvbnRyYWN0LkRhdGFTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudERhdGFTb3VyY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHJvbGUoKTogQ29udHJhY3QuRmllbGRSb2xlVHlwZSB7XHJcbiAgICByZXR1cm4gSW50ZXJuYWxUb0V4dGVybmFsRW51bU1hcHBpbmdzLmZpZWxkUm9sZVR5cGUuY29udmVydCh0aGlzLl9maWVsZEluZm8ucm9sZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGlzSGlkZGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkSW5mby5pc0hpZGRlbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaXNHZW5lcmF0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRJbmZvLmlzR2VuZXJhdGVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc0NhbGN1bGF0ZWRGaWVsZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZEluZm8uaXNDYWxjdWxhdGVkRmllbGQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGlzQ29tYmluZWRGaWVsZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZEluZm8uaXNDb21iaW5lZEZpZWxkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENhbGN1bGF0ZWRGaWVsZEFzeW5jKCk6IFByb21pc2U8Q29udHJhY3QuQ2FsY3VsYXRlZEZpZWxkIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpZWxkIGdldENhbGN1bGF0ZWRGaWVsZEFzeW5jIG1ldGhvZCBub3QgeWV0IGltcGxlbWVudGVkLicpO1xyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvSW50ZXJuYWwvRmllbGRJbXBsLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuaW1wb3J0IHsgVGFibGVhdUV4Y2VwdGlvbiB9IGZyb20gJ0B0YWJsZWF1L2FwaS11dGlscyc7XHJcbmltcG9ydCB7IEZpZWxkSW1wbCB9IGZyb20gJy4vSW50ZXJuYWwvRmllbGRJbXBsJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWVsZCBpbXBsZW1lbnRzIENvbnRyYWN0LkZpZWxkIHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfZmllbGRJbXBsOiBGaWVsZEltcGwpIHsgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZEltcGwubmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZEltcGwuaWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGRlc2NyaXB0aW9uKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRJbXBsLmRlc2NyaXB0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBhZ2dyZWdhdGlvbigpOiBDb250cmFjdC5GaWVsZEFnZ3JlZ2F0aW9uVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRJbXBsLmFnZ3JlZ2F0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBkYXRhU291cmNlKCk6IENvbnRyYWN0LkRhdGFTb3VyY2Uge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkSW1wbC5kYXRhU291cmNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCByb2xlKCk6IENvbnRyYWN0LkZpZWxkUm9sZVR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkSW1wbC5yb2xlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBpc0hpZGRlbigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZEltcGwuaXNIaWRkZW47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGlzR2VuZXJhdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ZpZWxkSW1wbC5pc0dlbmVyYXRlZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaXNDYWxjdWxhdGVkRmllbGQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRJbXBsLmlzQ2FsY3VsYXRlZEZpZWxkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBjb2x1bW5UeXBlKCk6IENvbnRyYWN0LkNvbHVtblR5cGUge1xyXG4gICAgdGhyb3cgVGFibGVhdUV4Y2VwdGlvbi5hcGlOb3RJbXBsZW1lbnRlZChbJ0ZpZWxkLmNvbHVtblR5cGUnXSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGlzQ29tYmluZWRGaWVsZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9maWVsZEltcGwuaXNDb21iaW5lZEZpZWxkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENhbGN1bGF0ZWRGaWVsZEFzeW5jKCk6IFByb21pc2U8Q29udHJhY3QuQ2FsY3VsYXRlZEZpZWxkIHwgdW5kZWZpbmVkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZmllbGRJbXBsLmdldENhbGN1bGF0ZWRGaWVsZEFzeW5jKCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9GaWVsZC50c1xuICoqLyIsImltcG9ydCAqIGFzIENvbnRyYWN0IGZyb20gJ0B0YWJsZWF1L2FwaS1leHRlcm5hbC1jb250cmFjdCc7XHJcbmltcG9ydCB7IFRhYmxlSW5mbyB9IGZyb20gJ0B0YWJsZWF1L2FwaS1pbnRlcm5hbC1jb250cmFjdCc7XHJcblxyXG4vKipcclxuICogSW1wbGVtZW50YXRpb24gb2YgYSB0YWJsZSBzdW1tYXJ5LlxyXG4gKiBUaGlzIGRvZXMgbm90IGZvbGxvdyB0aGUgSW1wbCBwYXR0ZXJuIGFzIGl0IGlzIGp1c3QgYSBwcm9wZXJ0eSBiYWcuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGFibGVTdW1tYXJ5IGltcGxlbWVudHMgQ29udHJhY3QuVGFibGVTdW1tYXJ5IHtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSBfdGFibGVJbmZvOiBUYWJsZUluZm8pIHsgfVxyXG5cclxuICBwdWJsaWMgZ2V0IG5hbWUoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl90YWJsZUluZm8ubmFtZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLl90YWJsZUluZm8uaWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGNvbm5lY3Rpb25JZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RhYmxlSW5mby5jb25uZWN0aW9uSWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGN1c3RvbVNRTCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RhYmxlSW5mby5jdXN0b21TUUw7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9UYWJsZVN1bW1hcnkudHNcbiAqKi8iLCJpbXBvcnQgeyBFeHRlbnNpb25TZXR0aW5nc0luZm8gfSBmcm9tICdAdGFibGVhdS9hcGktaW50ZXJuYWwtY29udHJhY3QnO1xyXG5pbXBvcnQgeyBBcGlTZXJ2aWNlUmVnaXN0cnkgfSBmcm9tICdAdGFibGVhdS9hcGktc2hhcmVkJztcclxuaW1wb3J0IHsgUGFyYW0sIFRhYmxlYXVFeGNlcHRpb24gfSBmcm9tICdAdGFibGVhdS9hcGktdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRXh0ZW5zaW9uc1NlcnZpY2VOYW1lcyB9IGZyb20gJy4uL1NlcnZpY2VzL0V4dGVuc2lvbnNTZXJ2aWNlTmFtZXMnO1xyXG5pbXBvcnQgeyBTZXR0aW5nc0NvbGxlY3Rpb24sIFNldHRpbmdzU2VydmljZSB9IGZyb20gJy4uL1NlcnZpY2VzL1NldHRpbmdzU2VydmljZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NJbXBsIHtcclxuICBwcml2YXRlIHN0YXRpYyBBU1lOQ19TQVZFX0lOX1BST0dSRVNTOiBzdHJpbmcgPSAnQXN5bmMgU2F2ZSBpcyBpbiBwcm9ncmVzcywgdXBkYXRpbmcgc2V0dGluZ3MgaXMgbm90IGFsbG93ZWQuJztcclxuICBwcml2YXRlIF9pc01vZGlmaWVkOiBib29sZWFuO1xyXG4gIHByaXZhdGUgX2N1cnJlbnRTZXR0aW5nczogU2V0dGluZ3NDb2xsZWN0aW9uO1xyXG5cclxuICAvLyBTaW5jZSBwcm9taXNlcyBjYW4ndCBiZSBpbnRyb3NwZWN0ZWQgZm9yIHN0YXRlLCBrZWVwIGEgdmFyaWFibGUgdGhhdFxyXG4gIC8vIGluZGljYXRlcyBhIHNhdmUgaXMgaW4gcHJvZ3Jlc3MsIHNvIHRoYXQgc2V0L2VyYXNlIGNhbid0IGJlIGNhbGxlZCBkdXJpbmcgYSBzYXZlLlxyXG4gIHByaXZhdGUgX3NhdmVJblByb2dyZXNzOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihzZXR0aW5nc0luZm86IEV4dGVuc2lvblNldHRpbmdzSW5mbykge1xyXG4gICAgdGhpcy5pbml0aWFsaXplU2V0dGluZ3Moc2V0dGluZ3NJbmZvKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBlcmFzZShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgUGFyYW0udmVyaWZ5VmFsdWUoa2V5LCAna2V5Jyk7XHJcblxyXG4gICAgLy8gT25seSBtYWtlIGEgbW9kaWZpY2F0aW9uIGlmIHdlIGhhdmUgdGhlIGtleSBhbHJlYWR5XHJcbiAgICBpZiAodGhpcy5fY3VycmVudFNldHRpbmdzW2tleV0pIHtcclxuICAgICAgdGhpcy52ZXJpZnlTZXR0aW5nc0FyZVVubG9ja2VkKCk7XHJcblxyXG4gICAgICBkZWxldGUgdGhpcy5fY3VycmVudFNldHRpbmdzW2tleV07XHJcbiAgICAgIHRoaXMuX2lzTW9kaWZpZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldChrZXk6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XHJcbiAgICBQYXJhbS52ZXJpZnlWYWx1ZShrZXksICdrZXknKTtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50U2V0dGluZ3Nba2V5XTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRBbGwoKTogU2V0dGluZ3NDb2xsZWN0aW9uIHtcclxuICAgIC8vIFJldHVybnMgYSBtdXRhYmxlIGNvcHkgb2YgdGhlIHNldHRpbmdzXHJcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fY3VycmVudFNldHRpbmdzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaXNNb2RpZmllZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc01vZGlmaWVkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNhdmVBc3luYygpOiBQcm9taXNlPFNldHRpbmdzQ29sbGVjdGlvbj4ge1xyXG4gICAgdGhpcy52ZXJpZnlTZXR0aW5nc0FyZVVubG9ja2VkKCk7XHJcblxyXG4gICAgLy8gSnVzdCByZXNvbHZlIGltbWVkaWF0ZWx5IGlmIHNldHRpbmdzIGFyZSB1bmNoYW5nZWRcclxuICAgIGlmICghdGhpcy5faXNNb2RpZmllZCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlPFNldHRpbmdzQ29sbGVjdGlvbj4odGhpcy5fY3VycmVudFNldHRpbmdzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zYXZlSW5Qcm9ncmVzcyA9IHRydWU7XHJcblxyXG4gICAgLy8gVXNlIHRoZSBzZXR0aW5ncyBzZXJ2aWNlIHRvIHNhdmUgc2V0dGluZ3MgdG8gdHdiXHJcbiAgICBjb25zdCBzZXR0aW5nc1NlcnZpY2UgPSBBcGlTZXJ2aWNlUmVnaXN0cnkuaW5zdGFuY2UuZ2V0U2VydmljZTxTZXR0aW5nc1NlcnZpY2U+KFxyXG4gICAgICBFeHRlbnNpb25zU2VydmljZU5hbWVzLlNldHRpbmdzU2VydmljZSk7XHJcblxyXG4gICAgcmV0dXJuIHNldHRpbmdzU2VydmljZS5zYXZlU2V0dGluZ3NBc3luYyh0aGlzLl9jdXJyZW50U2V0dGluZ3MpLnRoZW48U2V0dGluZ3NDb2xsZWN0aW9uPihuZXdTZXR0aW5ncyA9PiB7XHJcbiAgICAgIHRoaXMuX3NhdmVJblByb2dyZXNzID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuX2lzTW9kaWZpZWQgPSBmYWxzZTtcclxuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLl9jdXJyZW50U2V0dGluZ3MsIG5ld1NldHRpbmdzKTtcclxuICAgICAgcmV0dXJuIG5ld1NldHRpbmdzO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBQYXJhbS52ZXJpZnlWYWx1ZShrZXksICdrZXknKTsgLy8gS2V5IHNob3VsZG4ndCBiZSBhbiBlbXB0eSBzdHJpbmcuXHJcbiAgICBQYXJhbS52ZXJpZnlTdHJpbmcodmFsdWUsICd2YWx1ZScpOyAvLyBFbXB0eSBzdHJpbmcgdmFsdWUgaXMgYWxsb3dlZC5cclxuICAgIHRoaXMudmVyaWZ5U2V0dGluZ3NBcmVVbmxvY2tlZCgpO1xyXG5cclxuICAgIHRoaXMuX2N1cnJlbnRTZXR0aW5nc1trZXldID0gdmFsdWU7XHJcbiAgICB0aGlzLl9pc01vZGlmaWVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVNldHRpbmdzKHNldHRpbmdzSW5mbzogRXh0ZW5zaW9uU2V0dGluZ3NJbmZvKTogdm9pZCB7XHJcbiAgICBQYXJhbS52ZXJpZnlWYWx1ZShzZXR0aW5nc0luZm8sICdzZXR0aW5nc0luZm8nKTtcclxuICAgIFBhcmFtLnZlcmlmeVZhbHVlKHNldHRpbmdzSW5mby5zZXR0aW5nc1ZhbHVlcywgJ3NldHRpbmdzSW5mby5TZXR0aW5nc1ZhbHVlcycpO1xyXG5cclxuICAgIHRoaXMuX2N1cnJlbnRTZXR0aW5ncyA9IHNldHRpbmdzSW5mby5zZXR0aW5nc1ZhbHVlcztcclxuXHJcbiAgICAvLyBSZXNldCB0aGUgaXNNb2RpZmllZCBmbGFnXHJcbiAgICB0aGlzLl9pc01vZGlmaWVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGhlbHBlciBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBhbnkgbG9jYWwgdXBkYXRlIHRvIHRoaXMuY3VycmVudFNldHRpbmdzLlxyXG4gICAqIENoZWNrcyBpZiBhIGN1cnJlbnQgc2F2ZSBjYWxsIGlzIHN0aWxsIGluIHByb2dyZXNzIGFuZCB0aHJvd3MgYW4gZXJyb3IgaWYgc28uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB2ZXJpZnlTZXR0aW5nc0FyZVVubG9ja2VkKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3NhdmVJblByb2dyZXNzKSB7XHJcbiAgICAgIHRocm93IFRhYmxlYXVFeGNlcHRpb24uZXJyb3IoU2V0dGluZ3NJbXBsLkFTWU5DX1NBVkVfSU5fUFJPR1JFU1MpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9zcmMvSW50ZXJuYWwvU2V0dGluZ3NJbXBsLnRzXG4gKiovIiwiaW1wb3J0ICogYXMgQ29udHJhY3QgZnJvbSAnQHRhYmxlYXUvYXBpLWV4dGVybmFsLWNvbnRyYWN0JztcclxuXHJcbmltcG9ydCB7IEV4dGVuc2lvbnNJbXBsIH0gZnJvbSAnLi4vSW50ZXJuYWwvRXh0ZW5zaW9uc0ltcGwnO1xyXG5cclxuLyoqXHJcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBleHRlcm5hbCBFeHRlbnNpb25zIG5hbWVzcGFjZS5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBFeHRlbnNpb25zIGltcGxlbWVudHMgQ29udHJhY3QuRXh0ZW5zaW9ucyB7XHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0ZW5zaW9uSW1wbDogRXh0ZW5zaW9uc0ltcGwpIHtcclxuICAgIHRoaXMuZXh0ZW5zaW9uSW1wbCA9IGV4dGVuc2lvbkltcGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGRhc2hib2FyZENvbnRlbnQoKTogQ29udHJhY3QuRGFzaGJvYXJkQ29udGVudCB7XHJcbiAgICByZXR1cm4gdGhpcy5leHRlbnNpb25JbXBsLmRhc2hib2FyZENvbnRlbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IGVudmlyb25tZW50KCk6IENvbnRyYWN0LkVudmlyb25tZW50IHtcclxuICAgIHJldHVybiB0aGlzLmV4dGVuc2lvbkltcGwuZW52aXJvbm1lbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHNldHRpbmdzKCk6IENvbnRyYWN0LlNldHRpbmdzIHtcclxuICAgIHJldHVybiB0aGlzLmV4dGVuc2lvbkltcGwuc2V0dGluZ3M7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHVpKCk6IENvbnRyYWN0LlVJIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignQVBJIGNhbGwgbm90IHlldCBpbXBsZW1lbnRlZCcpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXRpYWxpemVBc3luYygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLmV4dGVuc2lvbkltcGwuaW5pdGlhbGl6ZUFzeW5jKCk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL3NyYy9OYW1lc3BhY2VzL0V4dGVuc2lvbnMudHNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9