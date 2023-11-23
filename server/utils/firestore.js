import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const config = {
  credential: cert({
    type: "service_account",
    project_id: "whos-da-captn",
    private_key_id: "88360d907b4e0ac874d80ec3669d834ac7eeedd3",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDx/Sp9jGDIyr6G\nmdR4J+ER/1fFykc5ekRKVWgO6ekTjw9WuJzND8HMYleYTsijAis56ps3v33N33v8\n6f5blwHEKN19mtE3sfEdQnW8MpCiffWJV3VWTCNOO5ppsXCboUEl/qaxwLJjaOWv\nVd8CkKkWidy5OEpKctSCzePOLpPrgW6VB4H/N5yIFqKZmdzzdhXVYYSVxiOK/9G/\nPnUCmaCkLAW+xrmbRllu5U1toOYSApVEUddhZtr4hbZafVApjGMdawv8vgYY1qX3\nng8fgSsRzr3ITlXggky+A+OSiwHX43VNqYepuzxHsU1SWVYavnHG4hIfs0x5m62s\na6SuSJ1HAgMBAAECggEAdbJ4basO0eqGg4ojZLOkzS+f/cQWI1ccCvmCTKqpYgl1\nYO0W2sgcru9wAlTjUiF2a8t3ZkR9iFn4ALnArMSEJ+fmXrajps6l4uDVyczgOyA/\ngebnW6tZiq4Duv+CMTfbq4Kxigga264D9OUzvBgnHZ69G9tMiuxR/zLr53cRG/wc\nXabbbWokPFJJPMs5EZA2kC/xtMzIDtRa6Mj1bgkYFQT2mKiMW1QD1UP2yT6yH2I4\nNRZBERXlZOyFHMtFtdQ78DkQFV2ZjoPPDVcmr9jYfZecdAD6aMlfQS/1THxG4a/d\nFAL35/4p9+oQogzYCmKU2by+/aqpr0y73aiw8o0fbQKBgQD/b1a8YO1kvAQPaLcm\nuimybpkNk+DEp3uV3V6Wrrjz1+VPWuGiQfbMcSgZ81alShtryx243x8smVaGsXzh\ni5G24ybS8lDI2RxYOJZY9+FEQkioR8RNqgOMGzGEVjNCgcQbTzpOBotPutAcYbL3\nswrxPGBhUzx1QO+6h1TvzMeNhQKBgQDyhjZWxuMm2f2TqP9JwGK+A8xCr5Z9KFla\naXeSrm8LQKYL48+4TdfZBU5elW+ROaehTiLnKKnkMtxNrKce3rpAgkRAooVfr527\nZEBV655v7LJKp+7ZWTIlZ1IQn0+rRk+c+blJM8sSa8hZozBOAOFSj0GdkY3FZ4O7\nY4kCq2nDWwKBgQDmj4X35XmCCp+TlQ50e2b1sxSdh9RDTXWk8TrWwgEZwM8v0LWH\ncwkkwiLTQaz85yZXJvC+FU+bPxE15PD22Lb/IIvDrosyr54BF5rF1YDUzwusMZNE\nEui+xzDr5a7BIkZz7BCRqyCGJ/Z/F8SmBksjMj9AuhQBNkrs0AjfprSczQKBgQDP\nX197V9jHUcJ3zhtsDqrf2xN/OfCt2CB/JItvyuN8da0Foaft6fHUyaq3SYP6Y5go\nX02M5sJONAcYC7diuAP+QOTnd5Afv2RZ5WD1luEExxm0qF+dTZ2JSg1r1S0kQJy2\nlvmN1FGh0LOhod4d9La2B3SNrPXSg66qPnPa6oMm3QKBgQCr0McetkWC4KzlAsZs\nqESR3ptJOgV+CfFW2QAp7vmdQaVIGBR/n0DLNgJfbna+IRZ/FwbT4jhT8+z6QRGA\n/QhZuZpqVKIwHJLS8T2dCXB3GzkGw3cz/QauYsKMRsFRTdyJ5SVR+3gcc6YQSC59\nPZweFmlRzmsE/YeTHtnXh3wzBA==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-qme1d@whos-da-captn.iam.gserviceaccount.com",
    client_id: "105079229876159010249",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qme1d%40whos-da-captn.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  })
}

export const app = initializeApp({
    //credential: cert('./service-account.json'),
    config
})

export const firestore = getFirestore();