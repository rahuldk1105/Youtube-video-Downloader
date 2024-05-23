from abilities import key_value_storage
from flask import request
import logging
from flask import Flask, render_template
from gunicorn.app.base import BaseApplication

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder='static')

@app.route("/", methods=["GET", "POST"])
def home_route():
    if request.method == "POST":
        video_url = request.form.get("video-url")
        format_type = request.form.get("format-type")
        if is_valid_url(video_url):
            # TODO: Implement download logic
            message = f"Download initiated as {format_type.upper()}"
            save_download_history(video_url, format_type)
        else:
            message = "Please enter a valid YouTube URL"
        return render_template("home.html", message=message, history=get_download_history())
    return render_template("home.html", history=get_download_history())

class StandaloneApplication(BaseApplication):
    def __init__(self, app, options=None):
        self.application = app
        self.options = options or {}
        super().__init__()

    def load_config(self):
        # Apply configuration to Gunicorn
        for key, value in self.options.items():
            if key in self.cfg.settings and value is not None:
                self.cfg.set(key.lower(), value)

    def load(self):
        return self.application
def save_download_history(video_url, format_type):
    history = key_value_storage("retrieve", "youtube_downloader", "history").get("kv_pairs", [])
    history.append({"video_url": video_url, "format_type": format_type})
    if len(history) > 5:
        history.pop(0)
    key_value_storage("store", "youtube_downloader", "history", str(history))

def get_download_history():
    history = key_value_storage("retrieve", "youtube_downloader", "history").get("kv_pairs", [])
    return history

def is_valid_url(url):
    pattern = re.compile(
        r'^(https?:\/\/)?'  # protocol
        r'((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'  # domain name
        r'((\d{1,3}\.){3}\d{1,3}))'  # OR ip (v4) address
        r'(\:\d+)?(\/[-a-z\d%_.~+]*)*'  # port and path
        r'(\?[;&a-z\d%_.~+=-]*)?'  # query string
        r'(\#[-a-z\d_]*)?$', re.IGNORECASE)  # fragment locator
    return re.match(pattern, url) is not None

if __name__ == "__main__":
    options = {
        "bind": "0.0.0.0:8080",
        "workers": 4,
        "loglevel": "info",
        "accesslog": "-"
    }
    StandaloneApplication(app, options).run()
