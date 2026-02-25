use log::{error, info};
use tauri::{Manager, WebviewWindowBuilder};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Bookmarks {
    pub items: Vec<Bookmark>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Bookmark {
    pub id: String,
    pub title: String,
    pub url: String,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HistoryEntry {
    pub id: String,
    pub title: String,
    pub url: String,
    pub visited_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Download {
    pub id: String,
    pub url: String,
    pub filename: String,
    pub progress: f64,
    pub status: String,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to X64 Browser!", name)
}

#[tauri::command]
fn minimize_window(window: tauri::Window) {
    let _ = window.minimize();
}

#[tauri::command]
fn maximize_window(window: tauri::Window) {
    if window.is_maximized().unwrap_or(false) {
        let _ = window.unmaximize();
    } else {
        let _ = window.maximize();
    }
}

#[tauri::command]
fn close_window(window: tauri::Window) {
    let _ = window.close();
}

#[tauri::command]
fn is_maximized(window: tauri::Window) -> bool {
    window.is_maximized().unwrap_or(false)
}

#[tauri::command]
async fn create_webview_window(
    _app: tauri::AppHandle,
    label: String,
    url: String,
) -> Result<(), String> {
    use tauri::WebviewUrl;
    let parsed_url = tauri::Url::parse(&url).map_err(|e| e.to_string())?;
    WebviewWindowBuilder::new(&_app, &label, WebviewUrl::External(parsed_url))
        .title("X64 Browser")
        .inner_size(1200.0, 800.0)
        .build()
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
async fn download_file(
    _app: tauri::AppHandle,
    url: String,
    filename: String,
) -> Result<String, String> {
    use tauri_plugin_http::reqwest;
    
    let client = reqwest::Client::new();
    let response = client.get(&url)
        .send()
        .await
        .map_err(|e| e.to_string())?;
    
    let downloads_dir = dirs::download_dir()
        .ok_or("Could not find downloads directory")?;
    
    let file_path = downloads_dir.join(&filename);
    let bytes = response.bytes().await.map_err(|e| e.to_string())?;
    
    std::fs::write(&file_path, bytes).map_err(|e| e.to_string())?;
    
    info!("Downloaded file to: {:?}", file_path);
    Ok(file_path.to_string_lossy().to_string())
}

#[tauri::command]
fn generate_id() -> String {
    use std::time::{SystemTime, UNIX_EPOCH};
    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_millis();
    format!("{}", timestamp)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_log::Builder::new()
                .target(tauri_plugin_log::Target::new(
                    tauri_plugin_log::TargetKind::LogDir {
                        file_name: Some("x64-browser".into()),
                    },
                ))
                .level(log::LevelFilter::Info)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_http::init())
        .setup(|app| {
            info!("X64 Browser starting up...");

            let window = app.get_webview_window("main").unwrap();

            #[cfg(debug_assertions)]
            {
                window.open_devtools();
            }

            info!("Main window initialized");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            minimize_window,
            maximize_window,
            close_window,
            is_maximized,
            create_webview_window,
            download_file,
            generate_id
        ])
        .run(tauri::generate_context!())
        .unwrap_or_else(|e| {
            error!("Error while running tauri application: {}", e);
            std::process::exit(1);
        });
}
