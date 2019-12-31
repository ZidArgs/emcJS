import model_type_AbstractType from "./model/type/AbstractType.js";
import model_type_TypeString from "./model/type/TypeString.js";
import storage_AdvancedIDBStorage from "./storage/AdvancedIDBStorage.js";
import storage_LocalStorage from "./storage/LocalStorage.js";
import storage_MemoryStorage from "./storage/MemoryStorage.js";
import storage_SessionStorage from "./storage/SessionStorage.js";
import storage_SimpleIDBStorage from "./storage/SimpleIDBStorage.js";
import ui_BusyIndicator from "./ui/BusyIndicator.js";
import ui_CaptionPanel from "./ui/CaptionPanel.js";
import ui_CollapsePanel from "./ui/CollapsePanel.js";
import ui_ContextMenu from "./ui/ContextMenu.js";
import ui_Dialog from "./ui/Dialog.js";
import ui_Icon from "./ui/Icon.js";
import ui_Import from "./ui/Import.js";
import ui_Paging from "./ui/Paging.js";
import ui_PopOver from "./ui/PopOver.js";
import ui_SettingsWindow from "./ui/SettingsWindow.js";
import ui_Toast from "./ui/Toast.js";
import ui_Tooltip from "./ui/Tooltip.js";
import ui_Window from "./ui/Window.js";
import ui_dragdrop_DragElement from "./ui/dragdrop/DragElement.js";
import ui_dragdrop_DropTarget from "./ui/dragdrop/DropTarget.js";
import ui_layout_HBox from "./ui/layout/HBox.js";
import ui_layout_Layout from "./ui/layout/Layout.js";
import ui_layout_LayoutAbstractElement from "./ui/layout/LayoutAbstractElement.js";
import ui_layout_Panel from "./ui/layout/Panel.js";
import ui_layout_VBox from "./ui/layout/VBox.js";
import ui_logic_LogicEditorClipboard from "./ui/logic/LogicEditorClipboard.js";
import ui_logic_LogicEditorTrashcan from "./ui/logic/LogicEditorTrashcan.js";
import ui_logic_LogicEditorWorkingarea from "./ui/logic/LogicEditorWorkingarea.js";
import ui_logic_elements_LogicAbstractElement from "./ui/logic/elements/LogicAbstractElement.js";
import ui_logic_elements_literals_LogicFalse from "./ui/logic/elements/literals/LogicFalse.js";
import ui_logic_elements_literals_LogicTrue from "./ui/logic/elements/literals/LogicTrue.js";
import ui_logic_elements_operators_LogicAnd from "./ui/logic/elements/operators/LogicAnd.js";
import ui_logic_elements_operators_LogicNand from "./ui/logic/elements/operators/LogicNand.js";
import ui_logic_elements_operators_LogicNor from "./ui/logic/elements/operators/LogicNor.js";
import ui_logic_elements_operators_LogicNot from "./ui/logic/elements/operators/LogicNot.js";
import ui_logic_elements_operators_LogicOr from "./ui/logic/elements/operators/LogicOr.js";
import ui_logic_elements_operators_LogicXor from "./ui/logic/elements/operators/LogicXor.js";
import ui_logic_elements_restrictors_LogicMax from "./ui/logic/elements/restrictors/LogicMax.js";
import ui_logic_elements_restrictors_LogicMin from "./ui/logic/elements/restrictors/LogicMin.js";
import ui_selection_ChoiceSelect from "./ui/selection/ChoiceSelect.js";
import ui_selection_ListSelect from "./ui/selection/ListSelect.js";
import ui_selection_Option from "./ui/selection/Option.js";
import ui_selection_StateButton from "./ui/selection/StateButton.js";
import ui_selection_SwitchButton from "./ui/selection/SwitchButton.js";
import util_DateUtil from "./util/DateUtil.js";
import util_FileLoader from "./util/FileLoader.js";
import util_FileSystem from "./util/FileSystem.js";
import util_Helper from "./util/Helper.js";
import util_ImportResources from "./util/ImportResources.js";
import util_Logger from "./util/Logger.js";
import util_Path from "./util/Path.js";
import util_Request from "./util/Request.js";
import util_Template from "./util/Template.js";
import util_Timer from "./util/Timer.js";
import util_UniqueGenerator from "./util/UniqueGenerator.js";
import util_converter_INI from "./util/converter/INI.js";
import util_converter_Properties from "./util/converter/Properties.js";
import util_converter_XML from "./util/converter/XML.js";
import util_events_EventBus from "./util/events/EventBus.js";
import util_events_EventBusAbstractModule from "./util/events/EventBusAbstractModule.js";
import util_events_EventBusModuleGeneric from "./util/events/EventBusModuleGeneric.js";
import util_events_EventBusModuleShare from "./util/events/EventBusModuleShare.js";
import util_logic_AbstractElement from "./util/logic/AbstractElement.js";
import util_logic_LiteralFalse from "./util/logic/LiteralFalse.js";
import util_logic_LiteralNumber from "./util/logic/LiteralNumber.js";
import util_logic_LiteralTrue from "./util/logic/LiteralTrue.js";
import util_logic_LiteralValue from "./util/logic/LiteralValue.js";
import util_logic_OperatorAnd from "./util/logic/OperatorAnd.js";
import util_logic_OperatorMax from "./util/logic/OperatorMax.js";
import util_logic_OperatorMin from "./util/logic/OperatorMin.js";
import util_logic_OperatorNand from "./util/logic/OperatorNand.js";
import util_logic_OperatorNor from "./util/logic/OperatorNor.js";
import util_logic_OperatorNot from "./util/logic/OperatorNot.js";
import util_logic_OperatorOr from "./util/logic/OperatorOr.js";
import util_logic_OperatorXor from "./util/logic/OperatorXor.js";
import util_logic_Processor from "./util/logic/Processor.js";

let index = {
    "model": {
        "type": {
            "AbstractType": model_type_AbstractType,
            "TypeString": model_type_TypeString
        }
    },
    "storage": {
        "AdvancedIDBStorage": storage_AdvancedIDBStorage,
        "LocalStorage": storage_LocalStorage,
        "MemoryStorage": storage_MemoryStorage,
        "SessionStorage": storage_SessionStorage,
        "SimpleIDBStorage": storage_SimpleIDBStorage
    },
    "ui": {
        "BusyIndicator": ui_BusyIndicator,
        "CaptionPanel": ui_CaptionPanel,
        "CollapsePanel": ui_CollapsePanel,
        "ContextMenu": ui_ContextMenu,
        "Dialog": ui_Dialog,
        "Icon": ui_Icon,
        "Import": ui_Import,
        "Paging": ui_Paging,
        "PopOver": ui_PopOver,
        "SettingsWindow": ui_SettingsWindow,
        "Toast": ui_Toast,
        "Tooltip": ui_Tooltip,
        "Window": ui_Window,
        "dragdrop": {
            "DragElement": ui_dragdrop_DragElement,
            "DropTarget": ui_dragdrop_DropTarget
        },
        "layout": {
            "HBox": ui_layout_HBox,
            "Layout": ui_layout_Layout,
            "LayoutAbstractElement": ui_layout_LayoutAbstractElement,
            "Panel": ui_layout_Panel,
            "VBox": ui_layout_VBox
        },
        "logic": {
            "LogicEditorClipboard": ui_logic_LogicEditorClipboard,
            "LogicEditorTrashcan": ui_logic_LogicEditorTrashcan,
            "LogicEditorWorkingarea": ui_logic_LogicEditorWorkingarea,
            "elements": {
                "LogicAbstractElement": ui_logic_elements_LogicAbstractElement,
                "literals": {
                    "LogicFalse": ui_logic_elements_literals_LogicFalse,
                    "LogicTrue": ui_logic_elements_literals_LogicTrue
                },
                "operators": {
                    "LogicAnd": ui_logic_elements_operators_LogicAnd,
                    "LogicNand": ui_logic_elements_operators_LogicNand,
                    "LogicNor": ui_logic_elements_operators_LogicNor,
                    "LogicNot": ui_logic_elements_operators_LogicNot,
                    "LogicOr": ui_logic_elements_operators_LogicOr,
                    "LogicXor": ui_logic_elements_operators_LogicXor
                },
                "restrictors": {
                    "LogicMax": ui_logic_elements_restrictors_LogicMax,
                    "LogicMin": ui_logic_elements_restrictors_LogicMin
                }
            }
        },
        "selection": {
            "ChoiceSelect": ui_selection_ChoiceSelect,
            "ListSelect": ui_selection_ListSelect,
            "Option": ui_selection_Option,
            "StateButton": ui_selection_StateButton,
            "SwitchButton": ui_selection_SwitchButton
        }
    },
    "util": {
        "DateUtil": util_DateUtil,
        "FileLoader": util_FileLoader,
        "FileSystem": util_FileSystem,
        "Helper": util_Helper,
        "ImportResources": util_ImportResources,
        "Logger": util_Logger,
        "Path": util_Path,
        "Request": util_Request,
        "Template": util_Template,
        "Timer": util_Timer,
        "UniqueGenerator": util_UniqueGenerator,
        "converter": {
            "INI": util_converter_INI,
            "Properties": util_converter_Properties,
            "XML": util_converter_XML
        },
        "events": {
            "EventBus": util_events_EventBus,
            "EventBusAbstractModule": util_events_EventBusAbstractModule,
            "EventBusModuleGeneric": util_events_EventBusModuleGeneric,
            "EventBusModuleShare": util_events_EventBusModuleShare
        },
        "logic": {
            "AbstractElement": util_logic_AbstractElement,
            "LiteralFalse": util_logic_LiteralFalse,
            "LiteralNumber": util_logic_LiteralNumber,
            "LiteralTrue": util_logic_LiteralTrue,
            "LiteralValue": util_logic_LiteralValue,
            "OperatorAnd": util_logic_OperatorAnd,
            "OperatorMax": util_logic_OperatorMax,
            "OperatorMin": util_logic_OperatorMin,
            "OperatorNand": util_logic_OperatorNand,
            "OperatorNor": util_logic_OperatorNor,
            "OperatorNot": util_logic_OperatorNot,
            "OperatorOr": util_logic_OperatorOr,
            "OperatorXor": util_logic_OperatorXor,
            "Processor": util_logic_Processor
        }
    }
};

export default index;