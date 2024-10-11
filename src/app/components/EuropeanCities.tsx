'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { useState } from 'react';

const CitiesArray = [
  {
    id: 225,
    cities: [
      {
        id: 2212,
        name: 'Adana',
        state_code: '01',
      },
      {
        id: 2155,
        name: 'Adıyaman',
        state_code: '02',
      },
      {
        id: 2179,
        name: 'Afyonkarahisar',
        state_code: '03',
      },
      {
        id: 2193,
        name: 'Ağrı',
        state_code: '04',
      },
      {
        id: 2210,
        name: 'Aksaray',
        state_code: '68',
      },
      {
        id: 2161,
        name: 'Amasya',
        state_code: '05',
      },
      {
        id: 2217,
        name: 'Ankara',
        state_code: '06',
      },
      {
        id: 2169,
        name: 'Antalya',
        state_code: '07',
      },
      {
        id: 2185,
        name: 'Ardahan',
        state_code: '75',
      },
      {
        id: 2191,
        name: 'Artvin',
        state_code: '08',
      },
      {
        id: 2187,
        name: 'Aydın',
        state_code: '09',
      },
      {
        id: 2175,
        name: 'Balıkesir',
        state_code: '10',
      },
      {
        id: 2148,
        name: 'Bartın',
        state_code: '74',
      },
      {
        id: 2194,
        name: 'Batman',
        state_code: '72',
      },
      {
        id: 2177,
        name: 'Bayburt',
        state_code: '69',
      },
      {
        id: 2221,
        name: 'Bilecik',
        state_code: '11',
      },
      {
        id: 2153,
        name: 'Bingöl',
        state_code: '12',
      },
      {
        id: 2215,
        name: 'Bitlis',
        state_code: '13',
      },
      {
        id: 2172,
        name: 'Bolu',
        state_code: '14',
      },
      {
        id: 2209,
        name: 'Burdur',
        state_code: '15',
      },
      {
        id: 2163,
        name: 'Bursa',
        state_code: '16',
      },
      {
        id: 2216,
        name: 'Çanakkale',
        state_code: '17',
      },
      {
        id: 2168,
        name: 'Çankırı',
        state_code: '18',
      },
      {
        id: 2173,
        name: 'Çorum',
        state_code: '19',
      },
      {
        id: 2157,
        name: 'Denizli',
        state_code: '20',
      },
      {
        id: 2226,
        name: 'Diyarbakır',
        state_code: '21',
      },
      {
        id: 2202,
        name: 'Düzce',
        state_code: '81',
      },
      {
        id: 2151,
        name: 'Edirne',
        state_code: '22',
      },
      {
        id: 2159,
        name: 'Elazığ',
        state_code: '23',
      },
      {
        id: 2160,
        name: 'Erzincan',
        state_code: '24',
      },
      {
        id: 2165,
        name: 'Erzurum',
        state_code: '25',
      },
      {
        id: 2164,
        name: 'Eskişehir',
        state_code: '26',
      },
      {
        id: 2203,
        name: 'Gaziantep',
        state_code: '27',
      },
      {
        id: 2186,
        name: 'Giresun',
        state_code: '28',
      },
      {
        id: 2204,
        name: 'Gümüşhane',
        state_code: '29',
      },
      {
        id: 2190,
        name: 'Hakkâri',
        state_code: '30',
      },
      {
        id: 2211,
        name: 'Hatay',
        state_code: '31',
      },
      {
        id: 2166,
        name: 'Iğdır',
        state_code: '76',
      },
      {
        id: 2222,
        name: 'Isparta',
        state_code: '32',
      },
      {
        id: 2170,
        name: 'İstanbul',
        state_code: '34',
      },
      {
        id: 2205,
        name: 'İzmir',
        state_code: '35',
      },
      {
        id: 2227,
        name: 'Kahramanmaraş',
        state_code: '46',
      },
      {
        id: 2223,
        name: 'Karabük',
        state_code: '78',
      },
      {
        id: 2184,
        name: 'Karaman',
        state_code: '70',
      },
      {
        id: 2208,
        name: 'Kars',
        state_code: '36',
      },
      {
        id: 2197,
        name: 'Kastamonu',
        state_code: '37',
      },
      {
        id: 2200,
        name: 'Kayseri',
        state_code: '38',
      },
      {
        id: 2154,
        name: 'Kilis',
        state_code: '79',
      },
      {
        id: 2178,
        name: 'Kırıkkale',
        state_code: '71',
      },
      {
        id: 2176,
        name: 'Kırklareli',
        state_code: '39',
      },
      {
        id: 2180,
        name: 'Kırşehir',
        state_code: '40',
      },
      {
        id: 2195,
        name: 'Kocaeli',
        state_code: '41',
      },
      {
        id: 2171,
        name: 'Konya',
        state_code: '42',
      },
      {
        id: 2149,
        name: 'Kütahya',
        state_code: '43',
      },
      {
        id: 2158,
        name: 'Malatya',
        state_code: '44',
      },
      {
        id: 2198,
        name: 'Manisa',
        state_code: '45',
      },
      {
        id: 2224,
        name: 'Mardin',
        state_code: '47',
      },
      {
        id: 2156,
        name: 'Mersin',
        state_code: '33',
      },
      {
        id: 2182,
        name: 'Muğla',
        state_code: '48',
      },
      {
        id: 2162,
        name: 'Muş',
        state_code: '49',
      },
      {
        id: 2196,
        name: 'Nevşehir',
        state_code: '50',
      },
      {
        id: 2189,
        name: 'Niğde',
        state_code: '51',
      },
      {
        id: 2174,
        name: 'Ordu',
        state_code: '52',
      },
      {
        id: 2214,
        name: 'Osmaniye',
        state_code: '80',
      },
      {
        id: 2219,
        name: 'Rize',
        state_code: '53',
      },
      {
        id: 2150,
        name: 'Sakarya',
        state_code: '54',
      },
      {
        id: 2220,
        name: 'Samsun',
        state_code: '55',
      },
      {
        id: 2183,
        name: 'Şanlıurfa',
        state_code: '63',
      },
      {
        id: 2207,
        name: 'Siirt',
        state_code: '56',
      },
      {
        id: 4854,
        name: 'Sinop',
        state_code: '57',
      },
      {
        id: 2181,
        name: 'Sivas',
        state_code: '58',
      },
      {
        id: 2225,
        name: 'Şırnak',
        state_code: '73',
      },
      {
        id: 2167,
        name: 'Tekirdağ',
        state_code: '59',
      },
      {
        id: 2199,
        name: 'Tokat',
        state_code: '60',
      },
      {
        id: 2206,
        name: 'Trabzon',
        state_code: '61',
      },
      {
        id: 2192,
        name: 'Tunceli',
        state_code: '62',
      },
      {
        id: 2201,
        name: 'Uşak',
        state_code: '64',
      },
      {
        id: 2152,
        name: 'Van',
        state_code: '65',
      },
      {
        id: 2218,
        name: 'Yalova',
        state_code: '77',
      },
      {
        id: 2188,
        name: 'Yozgat',
        state_code: '66',
      },
      {
        id: 2213,
        name: 'Zonguldak',
        state_code: '67',
      },
    ],
  },
  {
    id: 1,
    cities: [
      {
        id: 1,
        name: 'Tirana',
        state_code: 'AL',
      },
      {
        id: 2,
        name: 'Shkoder',
        state_code: 'AL',
      },
      {
        id: 3,
        name: 'Durres',
        state_code: 'AL',
      },
    ],
  },
  {
    id: 2,
    cities: [
      {
        id: 4,
        name: 'Andorra la Vella',
        state_code: 'AD',
      },
      {
        id: 5,
        name: 'Escaldes-Engordany',
        state_code: 'AD',
      },
      {
        id: 6,
        name: 'Encamp',
        state_code: 'AD',
      },
    ],
  },
  {
    id: 3,
    cities: [
      {
        id: 1,
        name: 'Yerevan',
        state_code: 'AM',
      },
      {
        id: 2,
        name: 'Gümrü',
        state_code: 'AM',
      },
      {
        id: 3,
        name: 'Vagharshapat',
        state_code: 'AM',
      },
    ],
  },
  {
    id: 4,
    cities: [
      {
        id: 7,
        name: 'Vienna',
        state_code: 'AT',
      },
      {
        id: 8,
        name: 'Graz',
        state_code: 'AT',
      },
      {
        id: 9,
        name: 'Linz',
        state_code: 'AT',
      },
    ],
  },
  {
    id: 5,
    cities: [
      {
        id: 118,
        name: 'Baku',
        state_code: 'AZ',
      },
      {
        id: 119,
        name: 'Ganja',
        state_code: 'AZ',
      },
      {
        id: 120,
        name: 'Lankaran',
        state_code: 'AZ',
      },
    ],
  },
  {
    id: 6,
    cities: [
      {
        id: 1,
        name: 'Minsk',
        state_code: 'BY',
      },
      {
        id: 2,
        name: 'Brest',
        state_code: 'BY',
      },
      {
        id: 3,
        name: 'Gomel',
        state_code: 'BY',
      },
    ],
  },
  {
    id: 7,
    cities: [
      {
        id: 10,
        name: 'Brussels',
        state_code: 'BE',
      },
      {
        id: 11,
        name: 'Antwerp',
        state_code: 'BE',
      },
      {
        id: 12,
        name: 'Ghent',
        state_code: 'BE',
      },
    ],
  },
  {
    id: 8,
    cities: [
      {
        id: 1,
        name: 'Sarajevo',
        state_code: 'BA',
      },
      {
        id: 2,
        name: 'Banja Luka',
        state_code: 'BA',
      },
      {
        id: 3,
        name: 'Tuzla',
        state_code: 'BA',
      },
    ],
  },
  {
    id: 9,
    cities: [
      {
        id: 13,
        name: 'Sofia',
        state_code: 'BG',
      },
      {
        id: 14,
        name: 'Plovdiv',
        state_code: 'BG',
      },
      {
        id: 15,
        name: 'Varna',
        state_code: 'BG',
      },
    ],
  },
  {
    id: 10,
    cities: [
      {
        id: 16,
        name: 'Zagreb',
        state_code: 'HR',
      },
      {
        id: 17,
        name: 'Split',
        state_code: 'HR',
      },
      {
        id: 18,
        name: 'Rijeka',
        state_code: 'HR',
      },
    ],
  },
  {
    id: 11,
    cities: [
      {
        id: 19,
        name: 'Nicosia',
        state_code: 'CY',
      },
      {
        id: 20,
        name: 'Limassol',
        state_code: 'CY',
      },
      {
        id: 21,
        name: 'Larnaca',
        state_code: 'CY',
      },
    ],
  },
  {
    id: 12,
    cities: [
      {
        id: 22,
        name: 'Prague',
        state_code: 'CZ',
      },
      {
        id: 23,
        name: 'Brno',
        state_code: 'CZ',
      },
      {
        id: 24,
        name: 'Ostrava',
        state_code: 'CZ',
      },
    ],
  },
  {
    id: 13,
    cities: [
      {
        id: 25,
        name: 'Copenhagen',
        state_code: 'DK',
      },
      {
        id: 26,
        name: 'Aarhus',
        state_code: 'DK',
      },
      {
        id: 27,
        name: 'Odense',
        state_code: 'DK',
      },
    ],
  },
  {
    id: 14,
    cities: [
      {
        id: 28,
        name: 'Tallinn',
        state_code: 'EE',
      },
      {
        id: 29,
        name: 'Tartu',
        state_code: 'EE',
      },
      {
        id: 30,
        name: 'Narva',
        state_code: 'EE',
      },
    ],
  },
  {
    id: 15,
    cities: [
      {
        id: 31,
        name: 'Helsinki',
        state_code: 'FI',
      },
      {
        id: 32,
        name: 'Espoo',
        state_code: 'FI',
      },
      {
        id: 33,
        name: 'Vantaa',
        state_code: 'FI',
      },
    ],
  },
  {
    id: 16,
    cities: [
      {
        id: 34,
        name: 'Paris',
        state_code: 'FR',
      },
      {
        id: 35,
        name: 'Marseille',
        state_code: 'FR',
      },
      {
        id: 36,
        name: 'Lyon',
        state_code: 'FR',
      },
    ],
  },
  {
    id: 17,
    cities: [
      {
        id: 1,
        name: 'Tiflis',
        state_code: 'GE',
      },
      {
        id: 2,
        name: 'Batum',
        state_code: 'GE',
      },
      {
        id: 3,
        name: 'Kutaisi',
        state_code: 'GE',
      },
    ],
  },

  {
    id: 18,
    cities: [
      {
        id: 37,
        name: 'Berlin',
        state_code: 'DE',
      },
      {
        id: 38,
        name: 'Munich',
        state_code: 'DE',
      },
      {
        id: 39,
        name: 'Hamburg',
        state_code: 'DE',
      },
    ],
  },
  {
    id: 19,
    cities: [
      {
        id: 40,
        name: 'Athens',
        state_code: 'GR',
      },
      {
        id: 41,
        name: 'Thessaloniki',
        state_code: 'GR',
      },
      {
        id: 42,
        name: 'Patras',
        state_code: 'GR',
      },
    ],
  },
  {
    id: 20,
    cities: [
      {
        id: 43,
        name: 'Budapest',
        state_code: 'HU',
      },
      {
        id: 44,
        name: 'Debrecen',
        state_code: 'HU',
      },
      {
        id: 45,
        name: 'Szeged',
        state_code: 'HU',
      },
    ],
  },
  {
    id: 21,
    cities: [
      {
        id: 46,
        name: 'Reykjavik',
        state_code: 'IS',
      },
      {
        id: 47,
        name: 'Kopavogur',
        state_code: 'IS',
      },
      {
        id: 48,
        name: 'Hafnarfjordur',
        state_code: 'IS',
      },
    ],
  },
  {
    id: 22,
    cities: [
      {
        id: 49,
        name: 'Dublin',
        state_code: 'IE',
      },
      {
        id: 50,
        name: 'Cork',
        state_code: 'IE',
      },
      {
        id: 51,
        name: 'Limerick',
        state_code: 'IE',
      },
    ],
  },
  {
    id: 23,
    cities: [
      {
        id: 52,
        name: 'Rome',
        state_code: 'IT',
      },
      {
        id: 53,
        name: 'Milan',
        state_code: 'IT',
      },
      {
        id: 54,
        name: 'Naples',
        state_code: 'IT',
      },
    ],
  },
  {
    id: 24,
    cities: [
      {
        id: 1,
        name: 'Lefkoşa',
        state_code: 'CY',
      },
      {
        id: 2,
        name: 'Gazimağusa',
        state_code: 'CY',
      },
      {
        id: 3,
        name: 'Girne',
        state_code: 'CY',
      },
    ],
  },
  {
    id: 25,
    cities: [
      {
        id: 58,
        name: 'Riga',
        state_code: 'LV',
      },
      {
        id: 59,
        name: 'Daugavpils',
        state_code: 'LV',
      },
      {
        id: 60,
        name: 'Liepaaja',
        state_code: 'LV',
      },
    ],
  },
  {
    id: 26,
    cities: [
      {
        id: 61,
        name: 'Vilnius',
        state_code: 'LT',
      },
      {
        id: 62,
        name: 'Kaunas',
        state_code: 'LT',
      },
      {
        id: 63,
        name: 'Klaipeda',
        state_code: 'LT',
      },
    ],
  },
  {
    id: 27,
    cities: [
      {
        id: 64,
        name: 'Luxembourg City',
        state_code: 'LU',
      },
      {
        id: 65,
        name: 'Echternach',
        state_code: 'LU',
      },
      {
        id: 66,
        name: 'Differdange',
        state_code: 'LU',
      },
    ],
  },
  {
    id: 28,
    cities: [
      {
        id: 1,
        name: 'Valletta',
        state_code: 'MT',
      },
      {
        id: 2,
        name: 'Birkirkara',
        state_code: 'MT',
      },
      {
        id: 3,
        name: 'Mosta',
        state_code: 'MT',
      },
    ],
  },

  {
    id: 29,
    cities: [
      {
        id: 70,
        name: 'Valletta',
        state_code: 'MT',
      },
      {
        id: 71,
        name: 'Birkirkara',
        state_code: 'MT',
      },
      {
        id: 72,
        name: 'Sliema',
        state_code: 'MT',
      },
    ],
  },
  {
    id: 30,
    cities: [
      {
        id: 1,
        name: 'Monako',
        state_code: 'MC',
      },
      {
        id: 2,
        name: 'Monte Carlo',
        state_code: 'MC',
      },
      {
        id: 3,
        name: 'La Condamine',
        state_code: 'MC',
      },
    ],
  },
  {
    id: 31,
    cities: [
      {
        id: 1,
        name: 'Podgorica',
        state_code: 'ME',
      },
      {
        id: 2,
        name: 'Herceg Novi',
        state_code: 'ME',
      },
      {
        id: 3,
        name: 'Kotor',
        state_code: 'ME',
      },
    ],
  },
  {
    id: 32,
    cities: [
      {
        id: 76,
        name: 'Amsterdam',
        state_code: 'NL',
      },
      {
        id: 77,
        name: 'Rotterdam',
        state_code: 'NL',
      },
      {
        id: 78,
        name: 'Lahey',
        state_code: 'NL',
      },
    ],
  },
  {
    id: 33,
    cities: [
      {
        id: 1,
        name: 'Üsküp',
        state_code: 'MK',
      },
      {
        id: 2,
        name: 'Manisa',
        state_code: 'MK',
      },
      {
        id: 3,
        name: 'Kumanova',
        state_code: 'MK',
      },
    ],
  },
  {
    id: 34,
    cities: [
      {
        id: 79,
        name: 'Oslo',
        state_code: 'NO',
      },
      {
        id: 80,
        name: 'Bergen',
        state_code: 'NO',
      },
      {
        id: 81,
        name: 'Stavanger',
        state_code: 'NO',
      },
    ],
  },
  {
    id: 35,
    cities: [
      {
        id: 82,
        name: 'Warsaw',
        state_code: 'PL',
      },
      {
        id: 83,
        name: 'Kraków',
        state_code: 'PL',
      },
      {
        id: 84,
        name: 'Wroclaw',
        state_code: 'PL',
      },
    ],
  },
  {
    id: 36,
    cities: [
      {
        id: 85,
        name: 'Lisbon',
        state_code: 'PT',
      },
      {
        id: 86,
        name: 'Porto',
        state_code: 'PT',
      },
      {
        id: 87,
        name: 'Coimbra',
        state_code: 'PT',
      },
    ],
  },
  {
    id: 37,
    cities: [
      {
        id: 88,
        name: 'Bucharest',
        state_code: 'RO',
      },
      {
        id: 89,
        name: 'Cluj-Napoca',
        state_code: 'RO',
      },
      {
        id: 90,
        name: 'Timisoara',
        state_code: 'RO',
      },
    ],
  },
  {
    id: 38,
    cities: [
      {
        id: 91,
        name: 'Moscow',
        state_code: 'RU',
      },
      {
        id: 92,
        name: 'Saint Petersburg',
        state_code: 'RU',
      },
      {
        id: 93,
        name: 'Novosibirsk',
        state_code: 'RU',
      },
    ],
  },
  {
    id: 40,
    cities: [
      {
        id: 94,
        name: 'Belgrade',
        state_code: 'RS',
      },
      {
        id: 95,
        name: 'Novi Sad',
        state_code: 'RS',
      },
      {
        id: 96,
        name: 'Niš',
        state_code: 'RS',
      },
    ],
  },
  {
    id: 41,
    cities: [
      {
        id: 97,
        name: 'Bratislava',
        state_code: 'SK',
      },
      {
        id: 98,
        name: 'Košice',
        state_code: 'SK',
      },
      {
        id: 99,
        name: 'Prešov',
        state_code: 'SK',
      },
    ],
  },
  {
    id: 42,
    cities: [
      {
        id: 1,
        name: 'Lubljana',
        state_code: 'SI',
      },
      {
        id: 2,
        name: 'Maribor',
        state_code: 'SI',
      },
      {
        id: 3,
        name: 'Celje',
        state_code: 'SI',
      },
    ],
  },
  {
    id: 43,
    cities: [
      {
        id: 1,
        name: 'Madrid',
        state_code: 'ES',
      },
      {
        id: 2,
        name: 'Barcelona',
        state_code: 'ES',
      },
      {
        id: 3,
        name: 'Valensiya',
        state_code: 'ES',
      },
    ],
  },
  {
    id: 44,
    cities: [
      {
        id: 1,
        name: 'Stockholm',
        state_code: 'SE',
      },
      {
        id: 2,
        name: 'Göteborg',
        state_code: 'SE',
      },
      {
        id: 3,
        name: 'Malmö',
        state_code: 'SE',
      },
    ],
  },
  {
    id: 45,
    cities: [
      {
        id: 1,
        name: 'Zürih',
        state_code: 'CH',
      },
      {
        id: 2,
        name: 'Cenevre',
        state_code: 'CH',
      },
      {
        id: 3,
        name: 'Bern',
        state_code: 'CH',
      },
    ],
  },
  {
    id: 46,
    cities: [
      {
        id: 1,
        name: 'Kyiv',
        state_code: 'UA',
      },
      {
        id: 2,
        name: 'Kharkiv',
        state_code: 'UA',
      },
      {
        id: 3,
        name: 'Odesa',
        state_code: 'UA',
      },
    ],
  },
  {
    id: 47,
    cities: [
      {
        id: 1,
        name: 'London',
        state_code: 'GB',
      },
      {
        id: 2,
        name: 'Edinburgh',
        state_code: 'GB',
      },
      {
        id: 3,
        name: 'Birmingham',
        state_code: 'GB',
      },
    ],
  },
  {
    id: 48,
    cities: [
      { id: 1, name: 'Muskat', state_code: 'OM' },
      { id: 2, name: 'Salalah', state_code: 'OM' },
      { id: 3, name: 'Sohar', state_code: 'OM' },
    ],
  },
  {
    id: 49,
    cities: [
      { id: 1, name: 'Tel Aviv', state_code: 'IL' },
      { id: 2, name: 'Haifa', state_code: 'IL' },
      { id: 3, name: 'Nasıra', state_code: 'IL' },
    ],
  },
  {
    id: 50,
    cities: [
      {
        id: 55,
        name: 'Pristina',
        state_code: 'XK',
      },
      {
        id: 56,
        name: 'Mitrovica',
        state_code: 'XK',
      },
      {
        id: 57,
        name: 'Ferizaj',
        state_code: 'XK',
      },
    ],
  },
  {
    id: 51,
    cities: [
      { id: 4, name: 'Teheran', state_code: 'IR' },
      { id: 1, name: 'Meşhed', state_code: 'IR' },
      { id: 2, name: 'İsfahan', state_code: 'IR' },
      { id: 3, name: 'Karaj', state_code: 'IR' },
    ],
  },
  {
    id: 52,
    cities: [
      { id: 1, name: 'Basra', state_code: 'IQ' },
      { id: 2, name: 'Musul', state_code: 'IQ' },
      { id: 3, name: 'Erbil', state_code: 'IQ' },
      { id: 3, name: 'Bağdad', state_code: 'IQ' },
    ],
  },
  {
    id: 53,
    cities: [
      { id: 1, name: 'Cidde', state_code: 'SA' },
      { id: 2, name: 'Mekke', state_code: 'SA' },
      { id: 3, name: 'Dammam', state_code: 'SA' },
      { id: 4, name: 'Riyad', state_code: 'SA' },
    ],
  },
  {
    id: 55,
    cities: [
      { id: 1, name: 'Dubai', state_code: 'AE' },
      { id: 2, name: 'Sharjah', state_code: 'AE' },
      { id: 3, name: 'Ajman', state_code: 'AE' },
      { id: 4, name: 'Abu Dhabi', state_code: 'AE' },
    ],
  },
  {
    id: 56,
    cities: [
      { id: 1, name: 'Al Rayyan', state_code: 'QA' },
      { id: 2, name: 'Al Wakrah', state_code: 'QA' },
      { id: 3, name: 'Al Khor', state_code: 'QA' },
      { id: 4, name: 'Doha', state_code: 'QA' },
    ],
  },
  {
    id: 57,
    cities: [
      { id: 1, name: 'Hawalli', state_code: 'KW' },
      { id: 2, name: 'Salmiya', state_code: 'KW' },
      { id: 3, name: 'Fahaheel', state_code: 'KW' },
      { id: 4, name: 'Kuveyt', state_code: 'KW' },
    ],
  },
  {
    id: 58,
    cities: [
      { id: 1, name: 'Muharrak', state_code: 'BH' },
      { id: 2, name: 'Riffa', state_code: 'BH' },
      { id: 3, name: 'Sitra', state_code: 'BH' },
      { id: 4, name: 'Manama', state_code: 'BH' },
    ],
  },
  {
    id: 59,
    cities: [
      { id: 1, name: 'Zerka', state_code: 'JO' },
      { id: 2, name: 'İrbid', state_code: 'JO' },
      { id: 3, name: 'Akabe', state_code: 'JO' },
      { id: 4, name: 'Amman', state_code: 'JO' },
    ],
  },
  {
    id: 60,
    cities: [
      { id: 1, name: 'Halep', state_code: 'SY' },
      { id: 2, name: 'Humus', state_code: 'SY' },
      { id: 3, name: 'Lazkiye', state_code: 'SY' },
      { id: 4, name: 'Şam', state_code: 'SY' },
    ],
  },
  {
    id: 61,
    cities: [
      { id: 1, name: 'Trablus', state_code: 'LB' },
      { id: 2, name: 'Sidon', state_code: 'LB' },
      { id: 3, name: 'Tyre', state_code: 'LB' },
    ],
  },
  {
    id: 62,
    cities: [
      { id: 1, name: 'Beytüllahim', state_code: 'PS' },
      { id: 2, name: 'Hebron', state_code: 'PS' },
      { id: 3, name: 'Cenin', state_code: 'PS' },
    ],
  },
];

interface CitySelectProps {
  selectedCountryId?: number; // Allow undefined
  setCity: (city: string) => void; // Function to set the city
}

export default function CitySelect({
  selectedCountryId,
  setCity,
}: CitySelectProps) {
  const [selectedCity, setSelectedCity] = useState<string | undefined>();

  const handleSelectCity = (value: string) => {
    setSelectedCity(value);
    setCity(value); // Set the city in the parent component
  };

  const cities =
    CitiesArray.find((country) => country.id === selectedCountryId)?.cities ||
    [];

  return (
    <Select onValueChange={handleSelectCity} value={selectedCity} required>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Bir şehir seç' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Şehirler</SelectLabel>
          {cities.map((city) => (
            <SelectItem
              key={city.id}
              value={city.name} // Set value to the city name
              className='flex items-center'
            >
              {city.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
