"""
Google Search Console API Connection Validator
Tests the service account credentials against Search Console API
"""
import os
from google.oauth2 import service_account
from googleapiclient.discovery import build

# Path to service account JSON
SERVICE_ACCOUNT_FILE = r'd:\richardnorwood.com\credentials\google-service-account.json'
SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly']

def validate_search_console_connection():
    try:
        # Create credentials from service account file
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE,
            scopes=SCOPES
        )
        
        # Build the Search Console service
        service = build('searchconsole', 'v1', credentials=credentials)
        
        # List all sites the service account has access to
        site_list = service.sites().list().execute()
        
        print("✅ CONNECTION SUCCESSFUL!")
        print("\n📊 Sites accessible by this service account:")
        
        if 'siteEntry' in site_list and site_list['siteEntry']:
            for site in site_list['siteEntry']:
                print(f"  - {site['siteUrl']} (Permission: {site['permissionLevel']})")
        else:
            print("  ⚠️  No sites found. Make sure the service account email is added to Search Console.")
            print("     Service Account: 760661705682-compute@developer.gserviceaccount.com")
        
        return True
        
    except Exception as e:
        print(f"❌ CONNECTION FAILED!")
        print(f"Error: {str(e)}")
        return False

if __name__ == "__main__":
    validate_search_console_connection()
