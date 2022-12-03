import {language} from "../../lng/language";

const SET_LANGUAGE = 'SET_LANGUAGE';
const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

const INVENTORY_CONTROL_LANGUAGE = 'inventory-control-language'

let initialState = {
    localization: null,
    languages:['EN', 'RU'],
    currentLanguage:'',
};

const localizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE: {
            localStorage.setItem(INVENTORY_CONTROL_LANGUAGE, JSON.stringify(action.language));
            if (action.language === 'RU') {
                return {
                    ...state,
                    localization: language.Ru,
                    currentLanguage: action.language
                }
            }
            if (action.language === 'EN') {
                return {
                    ...state,
                    localization: language.En,
                    currentLanguage: action.language
                }
            }
            return state;
        }
        case SET_LANGUAGE: {
            if (localStorage.getItem(INVENTORY_CONTROL_LANGUAGE).includes('RU')) {
                return {
                    ...state,
                    localization: language.Ru,
                    currentLanguage: 'RU'
                }
            }
            localStorage.setItem(INVENTORY_CONTROL_LANGUAGE, JSON.stringify('EN'));
            return {
                ...state,
                localization: language.En,
                currentLanguage: 'EN'
            }
        }
        default:
            return state;
    }
}

export const setLanguage = () => ({type: SET_LANGUAGE});
export const changeLanguage = (language) => ({type: CHANGE_LANGUAGE, language});

export default localizationReducer;