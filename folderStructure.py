import os

def create_folder_structure(base_dir):
    structure = {
        "backend": {
            "api": {
                "routes": {"auth.js": "# Authentication route"},
                "controllers": {"AuthController.js": "# Authentication logic"},
                "models": {"Admin.js": "# Admin model for DB interaction"},
            },
            "config": {"db.js": "# Database connection"},
            "server.js": "# Express server setup",
            ".env": "# Environment variables",
        },
        "database": {"schema.sql": "# SQL schema for creating the database"},
        "public": {
            "index.html": "# Login page HTML",
            "login.js": "# JavaScript for login logic",
            "style.css": "# Styles for the login page",
        },
    }

    def create_items(parent_path, items):
        for name, content in items.items():
            path = os.path.join(parent_path, name)
            if isinstance(content, dict):
                os.makedirs(path, exist_ok=True)
                create_items(path, content)
            else:
                with open(path, "w") as file:
                    file.write(content)

    os.makedirs(base_dir, exist_ok=True)
    create_items(base_dir, structure)

# Specify the base directory
base_directory = "PAIDPHONE"
create_folder_structure(base_directory)
print(f"Folder structure for {base_directory} created successfully!")
