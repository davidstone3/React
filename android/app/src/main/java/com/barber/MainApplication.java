package com.barber;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.horcrux.svg.SvgPackage;
import com.wix.RNCameraKit.RNCameraKitPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.imagepicker.ImagePickerPackage;
import com.gettipsi.stripe.StripeReactPackage;

import im.shimo.react.preference.PreferencePackage;
import com.henninghall.date_picker.DatePickerPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import android.support.multidex.MultiDex;
import android.content.Context;

public class MainApplication extends Application implements ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }


    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new StripeReactPackage(),
                    new RNFSPackage(),
                    new RNViewShotPackage(),
                    new SvgPackage(),
                    new RNCameraKitPackage(),
                    new RNGoogleSigninPackage(),
                    new ImagePickerPackage(),
                    new FBSDKPackage(mCallbackManager),
                    new PreferencePackage(),
                    new DatePickerPackage(),
                    new LinearGradientPackage(),
                    new VectorIconsPackage(),
                    new RNGestureHandlerPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };


    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        FacebookSdk.setApplicationId("300952084145848");
        FacebookSdk.sdkInitialize(getApplicationContext());
        AppEventsLogger.activateApp(this);
    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }
}
