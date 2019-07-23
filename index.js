import model_type_AbstractType from "./model/type/AbstractType.js";
import model_type_TypeString from "./model/type/TypeString.js";
import storage_GlobalData from "./storage/GlobalData.js";
import storage_LocalStorage from "./storage/LocalStorage.js";
import storage_MemoryStorage from "./storage/MemoryStorage.js";
import storage_SessionStorage from "./storage/SessionStorage.js";
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
import util_EventBus_EventBus from "./util/EventBus/EventBus.js";
import util_EventBus_EventBusAbstractModule from "./util/EventBus/EventBusAbstractModule.js";
import util_EventBus_EventBusModuleShare from "./util/EventBus/EventBusModuleShare.js";
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

let index = {
    "model": {
        "type": {
            "AbstractType": model_type_AbstractType,
            "TypeString": model_type_TypeString
        }
    },
    "storage": {
        "GlobalData": storage_GlobalData,
        "LocalStorage": storage_LocalStorage,
        "MemoryStorage": storage_MemoryStorage,
        "SessionStorage": storage_SessionStorage
    },
    "ui": {
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
        "EventBus": {
            "EventBus": util_EventBus_EventBus,
            "EventBusAbstractModule": util_EventBus_EventBusAbstractModule,
            "EventBusModuleShare": util_EventBus_EventBusModuleShare
        },
        "FileLoader": util_FileLoader,
        "FileSystem": util_FileSystem,
        "Helper": util_Helper,
        "ImportResources": util_ImportResources,
        "Logger": util_Logger,
        "Path": util_Path,
        "Request": util_Request,
        "Template": util_Template,
        "Timer": util_Timer,
        "UniqueGenerator": util_UniqueGenerator
    }
};

export default index;