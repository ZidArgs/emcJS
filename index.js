import mixins_EventBusSubset from "./mixins/EventBusSubset.js";
import model_type_AbstractType from "./model/type/AbstractType.js";
import model_type_TypeString from "./model/type/TypeString.js";
import storage_Cookie from "./storage/Cookie.js";
import storage_DebouncedState from "./storage/DebouncedState.js";
import storage_FileData from "./storage/FileData.js";
import storage_IDBStorage from "./storage/IDBStorage.js";
import storage_LocalStorage from "./storage/LocalStorage.js";
import storage_MemoryStorage from "./storage/MemoryStorage.js";
import storage_SessionStorage from "./storage/SessionStorage.js";
import ui_BusyIndicator from "./ui/BusyIndicator.js";
import ui_CaptionPanel from "./ui/CaptionPanel.js";
import ui_CollapsePanel from "./ui/CollapsePanel.js";
import ui_ContextMenu from "./ui/ContextMenu.js";
import ui_Dialog from "./ui/Dialog.js";
import ui_dragdrop_DragElement from "./ui/dragdrop/DragElement.js";
import ui_dragdrop_DropTarget from "./ui/dragdrop/DropTarget.js";
import ui_FilteredList from "./ui/FilteredList.js";
import ui_Icon from "./ui/Icon.js";
import ui_Import from "./ui/Import.js";
import ui_input_Button from "./ui/input/Button.js";
import ui_input_ChoiceSelect from "./ui/input/ChoiceSelect.js";
import ui_input_CircleSelect from "./ui/input/CircleSelect.js";
import ui_input_ListSelect from "./ui/input/ListSelect.js";
import ui_input_Number from "./ui/input/Number.js";
import ui_input_Option from "./ui/input/Option.js";
import ui_input_SearchSelect from "./ui/input/SearchSelect.js";
import ui_input_Select from "./ui/input/Select.js";
import ui_input_StateButton from "./ui/input/StateButton.js";
import ui_input_SwitchButton from "./ui/input/SwitchButton.js";
import ui_input_Text from "./ui/input/Text.js";
import ui_layout_HBox from "./ui/layout/HBox.js";
import ui_layout_Layout from "./ui/layout/Layout.js";
import ui_layout_LayoutAbstractElement from "./ui/layout/LayoutAbstractElement.js";
import ui_layout_Panel from "./ui/layout/Panel.js";
import ui_layout_TabView from "./ui/layout/TabView.js";
import ui_layout_VBox from "./ui/layout/VBox.js";
import ui_ListHeader from "./ui/ListHeader.js";
import ui_LogScreen from "./ui/LogScreen.js";
import ui_NavBar from "./ui/NavBar.js";
import ui_Paging from "./ui/Paging.js";
import ui_PopOver from "./ui/PopOver.js";
import ui_SettingsWindow from "./ui/SettingsWindow.js";
import ui_TextEditor from "./ui/TextEditor.js";
import ui_Toast from "./ui/Toast.js";
import ui_Tooltip from "./ui/Tooltip.js";
import ui_Window from "./ui/Window.js";
import util_ActionPath from "./util/ActionPath.js";
import util_converter_CSV from "./util/converter/CSV.js";
import util_converter_INI from "./util/converter/INI.js";
import util_converter_JSONC from "./util/converter/JSONC.js";
import util_converter_Properties from "./util/converter/Properties.js";
import util_converter_XML from "./util/converter/XML.js";
import util_DateUtil from "./util/DateUtil.js";
import util_DragDropMemory from "./util/DragDropMemory.js";
import util_events_EventBus from "./util/events/EventBus.js";
import util_events_EventBusAbstractModule from "./util/events/EventBusAbstractModule.js";
import util_events_EventBusModuleGeneric from "./util/events/EventBusModuleGeneric.js";
import util_events_EventBusModuleShare from "./util/events/EventBusModuleShare.js";
import util_events_EventBusSubset from "./util/events/EventBusSubset.js";
import util_FileLoader from "./util/FileLoader.js";
import util_FileSystem from "./util/FileSystem.js";
import util_graph_EdgeLogicCompiler from "./util/graph/EdgeLogicCompiler.js";
import util_graph_LogicGraph from "./util/graph/LogicGraph.js";
import util_graph_NodeFactory from "./util/graph/NodeFactory.js";
import util_graph_SimpleGraph from "./util/graph/SimpleGraph.js";
import util_Helper from "./util/Helper.js";
import util_HotkeyHandler from "./util/HotkeyHandler.js";
import util_I18n from "./util/I18n.js";
import util_Import from "./util/Import.js";
import util_Logger from "./util/Logger.js";
import util_LoggerRaw from "./util/LoggerRaw.js";
import util_logic_Compiler from "./util/logic/Compiler.js";
import util_logic_Processor from "./util/logic/Processor.js";
import util_Path from "./util/Path.js";
import util_Request from "./util/Request.js";
import util_Router from "./util/Router.js";
import util_Template from "./util/Template.js";
import util_Timer from "./util/Timer.js";
import util_UniqueGenerator from "./util/UniqueGenerator.js";
import util_ViewSwitcher from "./util/ViewSwitcher.js";

let index = {
    "mixins": {
        "EventBusSubset": mixins_EventBusSubset
    },
    "model": {
        "type": {
            "AbstractType": model_type_AbstractType,
            "TypeString": model_type_TypeString
        }
    },
    "storage": {
        "Cookie": storage_Cookie,
        "DebouncedState": storage_DebouncedState,
        "FileData": storage_FileData,
        "IDBStorage": storage_IDBStorage,
        "LocalStorage": storage_LocalStorage,
        "MemoryStorage": storage_MemoryStorage,
        "SessionStorage": storage_SessionStorage
    },
    "ui": {
        "BusyIndicator": ui_BusyIndicator,
        "CaptionPanel": ui_CaptionPanel,
        "CollapsePanel": ui_CollapsePanel,
        "ContextMenu": ui_ContextMenu,
        "Dialog": ui_Dialog,
        "dragdrop": {
            "DragElement": ui_dragdrop_DragElement,
            "DropTarget": ui_dragdrop_DropTarget
        },
        "FilteredList": ui_FilteredList,
        "Icon": ui_Icon,
        "Import": ui_Import,
        "input": {
            "Button": ui_input_Button,
            "ChoiceSelect": ui_input_ChoiceSelect,
            "CircleSelect": ui_input_CircleSelect,
            "ListSelect": ui_input_ListSelect,
            "Number": ui_input_Number,
            "Option": ui_input_Option,
            "SearchSelect": ui_input_SearchSelect,
            "Select": ui_input_Select,
            "StateButton": ui_input_StateButton,
            "SwitchButton": ui_input_SwitchButton,
            "Text": ui_input_Text
        },
        "layout": {
            "HBox": ui_layout_HBox,
            "Layout": ui_layout_Layout,
            "LayoutAbstractElement": ui_layout_LayoutAbstractElement,
            "Panel": ui_layout_Panel,
            "TabView": ui_layout_TabView,
            "VBox": ui_layout_VBox
        },
        "ListHeader": ui_ListHeader,
        "LogScreen": ui_LogScreen,
        "NavBar": ui_NavBar,
        "Paging": ui_Paging,
        "PopOver": ui_PopOver,
        "SettingsWindow": ui_SettingsWindow,
        "TextEditor": ui_TextEditor,
        "Toast": ui_Toast,
        "Tooltip": ui_Tooltip,
        "Window": ui_Window
    },
    "util": {
        "ActionPath": util_ActionPath,
        "converter": {
            "CSV": util_converter_CSV,
            "INI": util_converter_INI,
            "JSONC": util_converter_JSONC,
            "Properties": util_converter_Properties,
            "XML": util_converter_XML
        },
        "DateUtil": util_DateUtil,
        "DragDropMemory": util_DragDropMemory,
        "events": {
            "EventBus": util_events_EventBus,
            "EventBusAbstractModule": util_events_EventBusAbstractModule,
            "EventBusModuleGeneric": util_events_EventBusModuleGeneric,
            "EventBusModuleShare": util_events_EventBusModuleShare,
            "EventBusSubset": util_events_EventBusSubset
        },
        "FileLoader": util_FileLoader,
        "FileSystem": util_FileSystem,
        "graph": {
            "EdgeLogicCompiler": util_graph_EdgeLogicCompiler,
            "LogicGraph": util_graph_LogicGraph,
            "NodeFactory": util_graph_NodeFactory,
            "SimpleGraph": util_graph_SimpleGraph
        },
        "Helper": util_Helper,
        "HotkeyHandler": util_HotkeyHandler,
        "I18n": util_I18n,
        "Import": util_Import,
        "Logger": util_Logger,
        "LoggerRaw": util_LoggerRaw,
        "logic": {
            "Compiler": util_logic_Compiler,
            "Processor": util_logic_Processor
        },
        "Path": util_Path,
        "Request": util_Request,
        "Router": util_Router,
        "Template": util_Template,
        "Timer": util_Timer,
        "UniqueGenerator": util_UniqueGenerator,
        "ViewSwitcher": util_ViewSwitcher
    }
};

export default index;