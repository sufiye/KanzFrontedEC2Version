import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as en from "./en.json"
import * as az from "./az.json"
import * as ru from "./ru.json"
import * as ar from "./ar.json"


export const languages = [
    {
        title: "English",
        value: "en"
    },
    {
        title: "Azerbaijani",
        value: "az"
    },
     {
        title: "Rusian",
        value: "ru"
    },
     {
        title: "Arabic",
        value: "ar"
    },
]


i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: {
        translation: en
      },
      az: {
        translation: az
      },
      ru: {
        translation: ru
      },
      ar: {
        translation: ar
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false 
    }
  });

