export const pricingPlans = [
  {
    price: 0,
    plan: 'Стандарт',
    type: false,
    description: 'Стандартный пакет аренды, услуг и сервисного обслуживания Оборудования.',
    features: [
      'Плановые ТО',
      'Протяжка всех соединений, смазка узлов, замена колодок и\n' +
        'тормозных дисков, замена покрышек диагностика электрики.',
      'Замена сезонной резины',
    ],
    value: 'standard',
  },
  {
    plan: 'Премиум',
    type: true,
    quantity: 14,
    description:
      'Увеличенный пакет аренды, услуг и защиты элементов Оборудования с бесплатным сервисным обслуживанием',
    features: [
      'Аренда с бесплатным сервисным обслуживанием 41 элемента Оборудования.',
      'Плановые ТО',
      'Протяжка всех соединений, смазка узлов, замена колодок и\n' +
        'тормозных дисков, замена покрышек диагностика электрики',
      'Замена сезонной резины',
    ],
    pricing: [
      {
        role: 'courier',
        price: {
          kz: [
            { value: 7, label: '1 неделя - 5 845 ₸', price: 5845 },
            { value: 14, label: '2 недели - 11 288 ₸', price: 11288 },
            { value: 90, label: '3 месяца - 15 319 ₸/ месяц', price: 15319 },
            { value: 60, label: '2 месяца - 15 722 ₸/ месяц', price: 15722 },
            { value: 30, label: '1 месяц - 16 125 ₸/ месяц', price: 16125 },
          ],
          by: [
            { value: 7, label: '1 неделя - 38 руб', price: 38 },
            { value: 14, label: '2 недели - 73 руб', price: 73 },
            { value: 90, label: '3 месяца - 105 руб/ месяц', price: 105 },
            { value: 60, label: '2 месяца - 102 руб/ месяц', price: 102 },
            { value: 30, label: '1 месяц - 99 руб/ месяц', price: 99 },
          ],
        },
      },
      {
        role: 'corporate',
        price: {
          kz: [
            { value: 7, label: '1 неделя - 5 438 ₸', price: 5438 },
            { value: 14, label: '2 недели - 10 500 ₸', price: 10500 },
            { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 14250 },
            { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 14625 },
            { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 15000 },
          ],
          by: [
            { value: 7, label: '1 неделя - 35 руб', price: 35 },
            { value: 14, label: '2 недели - 68 руб', price: 68 },
            { value: 90, label: '3 месяца - 92 руб/ месяц', price: 92 },
            { value: 60, label: '2 месяца - 95 руб/ месяц', price: 95 },
            { value: 30, label: '1 месяц - 97 руб/ месяц', price: 97 },
          ],
        },
      },
    ],
    value: 'premium',
  },
];

export const proWarrantyPricing = [
  {
    role: 'courier',
    price: {
      kz: [
        { value: 7, label: '1 неделя - 5 438 ₸', price: 4822 },
        { value: 14, label: '2 недели - 10 500 ₸', price: 9312 },
        { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 12638 },
        { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 12971 },
        { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 13003 },
      ],
      by: [
        { value: 7, label: '1 неделя - 5 438 BYN', price: 31 },
        { value: 14, label: '2 недели - 10 500 BYN', price: 60 },
        { value: 90, label: '3 месяца - 14 250 BYN/ месяц', price: 82 },
        { value: 60, label: '2 месяца - 14 625 BYN/ месяц', price: 84 },
        { value: 30, label: '1 месяц - 15 000 BYN/ месяц', price: 86 },
      ],
    },
  },
  {
    role: 'corporate',
    price: {
      kz: [
        { value: 7, label: '1 неделя - 4 486 ₸', price: 4486 },
        { value: 14, label: '2 недели - 8 663 ₸', price: 8663 },
        { value: 90, label: '3 месяца - 11 756 ₸/ месяц', price: 11756 },
        { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 12066 },
        { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 12375 },
      ],
      by: [
        { value: 7, label: '1 неделя - 29 руб', price: 29 },
        { value: 14, label: '2 недели - 56 руб', price: 56 },
        { value: 90, label: '3 месяца - 76 руб/ месяц', price: 76 },
        { value: 60, label: '2 месяца - 78 руб/ месяц', price: 78 },
        { value: 30, label: '1 месяц - 80 руб/ месяц', price: 80 },
      ],
    },
  },
];

export const depositPricing = [
  {
    role: 'courier',
    price: {
      kz: [
        { value: 7, label: '1 неделя - 5 438 ₸', price: 30000 },
        { value: 14, label: '2 недели - 10 500 ₸', price: 30000 },
        { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 20000 },
        { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 20000 },
        { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 20000 },
      ],
      by: [
        { value: 7, label: '1 неделя - 5 438 BYN', price: 195 },
        { value: 14, label: '2 недели - 10 500 BYN', price: 195 },
        { value: 90, label: '3 месяца - 14 250 BYN/ месяц', price: 130 },
        { value: 60, label: '2 месяца - 14 625 BYN/ месяц', price: 130 },
        { value: 30, label: '1 месяц - 15 000 BYN/ месяц', price: 130 },
      ],
    },
  },
  {
    role: 'corporate',
    price: {
      kz: [
        { value: 7, label: '1 неделя - 4 486 ₸', price: 25000 },
        { value: 14, label: '2 недели - 8 663 ₸', price: 25000 },
        { value: 90, label: '3 месяца - 11 756 ₸/ месяц', price: 15000 },
        { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 15000 },
        { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 15000 },
      ],
      by: [
        { value: 7, label: '1 неделя - 29 руб', price: 162 },
        { value: 14, label: '2 недели - 56 руб', price: 162 },
        { value: 90, label: '3 месяца - 76 руб/ месяц', price: 97 },
        { value: 60, label: '2 месяца - 78 руб/ месяц', price: 97 },
        { value: 30, label: '1 месяц - 80 руб/ месяц', price: 97 },
      ],
    },
  },
];

export const batteryPricing = [
  {
    role: 'courier',
    price: {
      kz: [
        {
          label: '21 Ач',
          price: [
            { value: 7, label: '1 неделя - 5 438 ₸', price: 10278 },
            { value: 14, label: '2 недели - 10 500 ₸', price: 19847 },
            { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 26935 },
            { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 27644 },
            { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 28353 },
          ],
          value: '21Ah',
        },
        {
          label: '30 Ач',
          price: [
            { value: 7, label: '1 неделя - 5 438 ₸', price: 10278 },
            { value: 14, label: '2 недели - 10 500 ₸', price: 19847 },
            { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 26935 },
            { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 27644 },
            { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 28353 },
          ],
          value: '30Ah',
        },
        {
          label: '45 Ач',
          price: [
            { value: 7, label: '1 неделя - 5 438 ₸', price: 15417 },
            { value: 14, label: '2 недели - 10 500 ₸', price: 29771 },
            { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 40403 },
            { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 41466 },
            { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 42530 },
          ],
          value: '45Ah',
        },
      ],
      by: [
        {
          label: '21 Ач',
          price: [
            { value: 7, label: '1 неделя - 5 438 ₸', price: 67 },
            { value: 14, label: '2 недели - 10 500 ₸', price: 129 },
            { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 176 },
            { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 179 },
            { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 184 },
          ],
          value: '21Ah',
        },
        {
          label: '30 Ач',
          price: [
            { value: 7, label: '1 неделя - 5 438 ₸', price: 67 },
            { value: 14, label: '2 недели - 10 500 ₸', price: 129 },
            { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 176 },
            { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 179 },
            { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 184 },
          ],
          value: '30Ah',
        },
        {
          label: '45 Ач',
          price: [
            { value: 7, label: '1 неделя - 5 438 ₸', price: 100 },
            { value: 14, label: '2 недели - 10 500 ₸', price: 193 },
            { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 262 },
            { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 269 },
            { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 276 },
          ],
          value: '45Ah',
        },
      ],
    },
  },
  {
    role: 'corporate',
    price: {
      kz: [
        {
          label: '21 Ач',
          price: [
            { value: 7, label: '1 неделя - 5 438 ₸', price: 9561 },
            { value: 14, label: '2 недели - 10 500 ₸', price: 18463 },
            { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 25056 },
            { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 25716 },
            { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 26375 },
          ],
          value: '21Ah',
        },
        {
          label: '30 Ач',
          price: [
            { value: 7, label: '1 неделя - 5 438 ₸', price: 9561 },
            { value: 14, label: '2 недели - 10 500 ₸', price: 18463 },
            { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 25056 },
            { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 25716 },
            { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 26375 },
          ],
          value: '30Ah',
        },
        {
          label: '45 Ач',
          price: [
            { value: 7, label: '1 неделя - 5 438 ₸', price: 14371 },
            { value: 14, label: '2 недели - 10 500 ₸', price: 27694 },
            { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 37584 },
            { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 38573 },
            { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 39563 },
          ],
          value: '45Ah',
        },
      ],
      by: [
        {
          label: '21 Ач',
          price: [
            { value: 7, label: '1 неделя - 5 438 ₸', price: 62 },
            { value: 14, label: '2 недели - 10 500 ₸', price: 120 },
            { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 162 },
            { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 167 },
            { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 171 },
          ],
          value: '21Ah',
        },
        {
          label: '30 Ач',
          price: [
            { value: 7, label: '1 неделя - 5 438 ₸', price: 62 },
            { value: 14, label: '2 недели - 10 500 ₸', price: 120 },
            { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 162 },
            { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 167 },
            { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 171 },
          ],
          value: '30Ah',
        },
        {
          label: '45 Ач',
          price: [
            { value: 7, label: '1 неделя - 5 438 ₸', price: 93 },
            { value: 14, label: '2 недели - 10 500 ₸', price: 180 },
            { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 244 },
            { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 250 },
            { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 257 },
          ],
          value: '45Ah',
        },
      ],
    },
  },
];

export const termoBoxPricing = [
  {
    role: 'courier',
    price: {
      kz: [
        { value: 90, label: '3 месяца - 14 250 ₸/ месяц', price: 1000 },
        { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 1000 },
        { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 1000 },
      ],
      by: [
        { value: 90, label: '3 месяца - 14 250 BYN/ месяц', price: 6 },
        { value: 60, label: '2 месяца - 14 625 BYN/ месяц', price: 6 },
        { value: 30, label: '1 месяц - 15 000 BYN/ месяц', price: 6 },
      ],
    },
  },
  {
    role: 'corporate',
    price: {
      kz: [
        { value: 7, label: '1 неделя - 4 486 ₸', price: 25000 },
        { value: 14, label: '2 недели - 8 663 ₸', price: 25000 },
        { value: 90, label: '3 месяца - 11 756 ₸/ месяц', price: 15000 },
        { value: 60, label: '2 месяца - 14 625 ₸/ месяц', price: 15000 },
        { value: 30, label: '1 месяц - 15 000 ₸/ месяц', price: 15000 },
      ],
      by: [
        { value: 7, label: '1 неделя - 29 руб', price: 162 },
        { value: 14, label: '2 недели - 56 руб', price: 162 },
        { value: 90, label: '3 месяца - 76 руб/ месяц', price: 97 },
        { value: 60, label: '2 месяца - 78 руб/ месяц', price: 97 },
        { value: 30, label: '1 месяц - 80 руб/ месяц', price: 97 },
      ],
    },
  },
];
