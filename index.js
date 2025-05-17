import { extension_settings, getContext } from "../../../extensions.js";
import { saveSettingsDebounced } from "../../../../script.js";

// 插件基本信息
const extensionName = "rpg-battle-system";
const extensionFolderPath = `scripts/extensions/third-party/${extensionName}`;
const extensionSettings = extension_settings[extensionName];
const defaultSettings = {
    characterStats: {
        name: "主角",
        level: 1,
        hp: 100,
        maxHp: 100,
        mp: 50,
        maxMp: 50,
        str: 10,
        agi: 10,
        int: 10,
        vit: 10
    }
};

// 加载设置
async function loadSettings() {
    extension_settings[extensionName] = extension_settings[extensionName] || {};
    if (Object.keys(extension_settings[extensionName]).length === 0) {
        Object.assign(extension_settings[extensionName], defaultSettings);
    }
    updateCharacterDisplay();
}

// 更新角色显示
function updateCharacterDisplay() {
    const stats = extension_settings[extensionName].characterStats;
    
    // 更新基本信息
    $("#character_name").text(stats.name);
    $("#character_level").text(`等级: ${stats.level}`);
    
    // 更新HP/MP
    $("#hp_value").text(`${stats.hp}/${stats.maxHp}`);
    $("#mp_value").text(`${stats.mp}/${stats.maxMp}`);
    
    // 更新HP/MP条
    const hpPercent = (stats.hp / stats.maxHp) * 100;
    const mpPercent = (stats.mp / stats.maxMp) * 100;
    $("#hp_bar").css("width", `${hpPercent}%`);
    $("#mp_bar").css("width", `${mpPercent}%`);
    
    // 更新属性值
    $("#str_value").text(stats.str);
    $("#agi_value").text(stats.agi);
    $("#int_value").text(stats.int);
    $("#vit_value").text(stats.vit);
}

// 打开/关闭状态窗口
function toggleCharacterStatus() {
    $("#character_status_modal").toggleClass("visible");
    
    // 如果窗口打开，更新数据
    if ($("#character_status_modal").hasClass("visible")) {
        updateCharacterDisplay();
    }
}

// 初始化
jQuery(async () => {
    // 加载HTML
    const statusHtml = await $.get(`${extensionFolderPath}/status.html`);
    $("body").append(statusHtml);
    
    // 绑定事件
    $("#character_status_button").on("click", toggleCharacterStatus);
    $(".rpg-close-button").on("click", toggleCharacterStatus);
    
    // 加载设置
    loadSettings();
});
