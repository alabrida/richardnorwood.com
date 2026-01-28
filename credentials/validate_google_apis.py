"""
Google API Connection Validator
Tests Search Console and Analytics (GA4) access
"""
import os
from google.oauth2 import service_account
from googleapiclient.discovery import build

SERVICE_ACCOUNT_FILE = r'd:\richardnorwood.com\credentials\google-service-account.json'

def validate_search_console():
    """Test Google Search Console API access"""
    print("\n" + "="*50)
    print("[SEARCH CONSOLE]")
    print("="*50)
    
    try:
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE,
            scopes=['https://www.googleapis.com/auth/webmasters.readonly']
        )
        
        service = build('searchconsole', 'v1', credentials=credentials)
        site_list = service.sites().list().execute()
        
        print("[OK] CONNECTION SUCCESSFUL!")
        
        if 'siteEntry' in site_list and site_list['siteEntry']:
            for site in site_list['siteEntry']:
                print(f"   Site: {site['siteUrl']}")
                print(f"   Permission: {site['permissionLevel']}")
        else:
            print("   [WARN] No sites found.")
        
        return True
        
    except Exception as e:
        print(f"[FAIL] {str(e)}")
        return False


def validate_analytics():
    """Test Google Analytics Data API (GA4) access"""
    print("\n" + "="*50)
    print("[GOOGLE ANALYTICS GA4]")
    print("="*50)
    
    try:
        credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE,
            scopes=['https://www.googleapis.com/auth/analytics.readonly']
        )
        
        # GA4 Admin API to list accounts
        admin_service = build('analyticsadmin', 'v1beta', credentials=credentials)
        accounts = admin_service.accounts().list().execute()
        
        print("[OK] CONNECTION SUCCESSFUL!")
        
        if 'accounts' in accounts and accounts['accounts']:
            for account in accounts['accounts']:
                print(f"   Account: {account.get('displayName', 'N/A')}")
                print(f"   ID: {account.get('name', 'N/A')}")
                
                # List properties for this account
                try:
                    properties = admin_service.properties().list(
                        filter=f"parent:{account['name']}"
                    ).execute()
                    
                    if 'properties' in properties:
                        for prop in properties['properties']:
                            print(f"   - Property: {prop.get('displayName', 'N/A')}")
                            print(f"     ID: {prop.get('name', 'N/A')}")
                except Exception as prop_error:
                    print(f"   - Could not list properties: {prop_error}")
        else:
            print("   [WARN] No accounts found.")
            print("   TIP: Add service account as Viewer in GA4.")
            print(f"   Service Account: 760661705682-compute@developer.gserviceaccount.com")
        
        return True
        
    except Exception as e:
        print(f"[FAIL] {str(e)}")
        if "has not been used" in str(e) or "disabled" in str(e):
            print("   TIP: Enable Analytics Admin API in GCP Console")
        return False


if __name__ == "__main__":
    print("\n[GOOGLE API VALIDATION]")
    print("Service Account: 760661705682-compute@developer.gserviceaccount.com")
    
    gsc_ok = validate_search_console()
    ga_ok = validate_analytics()
    
    print("\n" + "="*50)
    print("[SUMMARY]")
    print("="*50)
    print(f"Search Console: {'OK' if gsc_ok else 'FAIL'}")
    print(f"Analytics (GA4): {'OK' if ga_ok else 'FAIL'}")
