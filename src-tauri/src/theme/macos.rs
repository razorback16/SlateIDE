/*!
 * Portions of this file are based on code from `wyhaya/tauri-plugin-theme`.
 * Credits to wyhaya: https://github.com/wyhaya/tauri-plugin-theme
 */

use super::{save_theme_state, Theme};
use objc2_app_kit::{NSAppearance, NSAppearanceNameVibrantDark, NSAppearanceNameVibrantLight};
use tauri::{AppHandle, Manager, Runtime};

#[tauri::command]
#[specta::specta]
pub fn set_theme<R: Runtime>(app: AppHandle<R>, theme: Theme) -> Result<(), &'static str> {
    save_theme_state(&app, theme)?;

    for window in app.webview_windows().values() {
        let ptr = window.ns_window().map_err(|_| "Invalid window handle")?;
        unsafe {
            use objc2::msg_send;
            use objc2::runtime::AnyObject;

            let ns_window = ptr as *mut AnyObject;
            match theme {
                Theme::System => {
                    let _: () = msg_send![ns_window, setAppearance: std::ptr::null::<AnyObject>()];
                }
                Theme::Light => {
                    let appearance = NSAppearance::appearanceNamed(NSAppearanceNameVibrantLight);
                    if let Some(appearance) = appearance {
                        let _: () = msg_send![ns_window, setAppearance: &*appearance];
                    }
                }
                Theme::Dark => {
                    let appearance = NSAppearance::appearanceNamed(NSAppearanceNameVibrantDark);
                    if let Some(appearance) = appearance {
                        let _: () = msg_send![ns_window, setAppearance: &*appearance];
                    }
                }
            };
        }
    }

    Ok(())
}
