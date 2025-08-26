import subprocess
import time
import os
from pathlib import Path

# Path to your Spring Boot project
PROJECT_DIR = Path("../")  # change this

# Gradle command
# COMMAND = ["./gradlew", "bootRun"]  # or ["./mvnw", "spring-boot:run"] for Maven
COMMAND = ["./gradlew", "compileJava"]  # or ["./mvnw", "spring-boot:run"] for Maven

# File extensions to watch
WATCH_EXTENSIONS = [".java", ".kt", ".xml", ".yml", ".properties"]



# Store last modification times
last_modified = {}

def scan_files():
    files = []
    for ext in WATCH_EXTENSIONS:
        # files.extend(PROJECT_DIR.rglob(f"*{ext}"))
        files.extend(PROJECT_DIR.rglob(f"src/**/*"))
    return files

def files_changed():
    global last_modified
    changed = False
    files = scan_files()
    for f in files:
        mtime = f.stat().st_mtime
        if f not in last_modified:
            last_modified[f] = mtime
            continue
        if mtime != last_modified[f]:
            last_modified[f] = mtime
            changed = True
    return changed

def start_spring():
    return subprocess.Popen(COMMAND, cwd=PROJECT_DIR)

if __name__ == "__main__":
    print("Starting Spring Boot...")
    process = start_spring()
    try:
        while True:
            if files_changed():
                print("Changes detected, restarting Spring Boot...")
                process.terminate()  # stop old process
                process.wait()
                process = start_spring()
            time.sleep(1)  # check every second
    except KeyboardInterrupt:
        print("Stopping Spring Boot...")
        process.terminate()
        process.wait()
