declare module "react-country-state-city" {
  import * as React from "react";

  interface Country {
    id: number;
    name: string;
    iso2: string;
  }

  interface State {
    id: number;
    name: string;
    country_id: number;
  }

  interface City {
    id: number;
    name: string;
    state_id: number;
  }

  interface Language {
    code: string;
    name: string;
    native: string;
  }

  interface CountrySelectProps {
    value?: Country;
    onChange?: (value: Country) => void;
    placeHolder?: string;
    className?: string;
  }

  interface StateSelectProps {
    value?: State;
    onChange?: (value: State) => void;
    placeHolder?: string;
    className?: string;
    countryid?: number;
  }

  interface CitySelectProps {
    value?: City;
    onChange?: (value: City) => void;
    placeHolder?: string;
    className?: string;
    countryid?: number;
    stateid?: number;
  }

  interface LanguageSelectProps {
    value?: Language;
    onChange?: (value: Language) => void;
    placeHolder?: string;
    className?: string;
  }

  export const CountrySelect: React.FC<CountrySelectProps>;
  export const StateSelect: React.FC<StateSelectProps>;
  export const CitySelect: React.FC<CitySelectProps>;
  export const LanguageSelect: React.FC<LanguageSelectProps>;
}
