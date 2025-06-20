'use client';
import React from 'react';

export default function RentPolicyTab() {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-4">Политика аренды</h1>
      <p className="text-sm text-gray-500 mb-6">Последнее обновление: 10.03.2025</p>

      <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
        <p>
          Данный документ описывает правила и условия аренды электрических велосипедов и иной
          техники, предоставляемой компанией <strong>DeliLux</strong> (далее — «Компания»).
          Настоящие условия аренды обязательны для всех пользователей, желающих воспользоваться
          услугами Компании.
        </p>

        <h2 className="text-lg font-semibold">1. Общие положения</h2>
        <ul className="list-disc list-inside ml-4">
          <li>
            Арендатор обязан использовать арендуемый велосипед (далее — «Велосипед») исключительно в
            личных целях, не нарушая законодательство Республики Казахстан.
          </li>
          <li>
            При получении Велосипеда арендатор обязан проверить его на отсутствие внешних
            повреждений и убедиться в исправности.
          </li>
          <li>Компания оставляет за собой право отказать в аренде без объяснения причин.</li>
        </ul>

        <h2 className="text-lg font-semibold">2. Условия оплаты</h2>
        <ul className="list-disc list-inside ml-4">
          <li>
            Стоимость аренды рассчитывается на основании тарифов, опубликованных на официальном
            сайте Компании или в мобильном приложении.
          </li>
          <li>
            Оплата аренды производится в момент оформления заказа через доступные платёжные системы
            или иными способами, указанными на сайте Компании.
          </li>
          <li>В случае досрочного возврата Велосипеда перерасчёт аренды не производится.</li>
        </ul>

        <h2 className="text-lg font-semibold">3. Ответственность арендатора</h2>
        <ul className="list-disc list-inside ml-4">
          <li>
            Арендатор несёт полную ответственность за сохранность Велосипеда на весь период аренды,
            включая риск утраты или повреждения.
          </li>
          <li>
            В случае поломки или утери Велосипеда арендатор обязан немедленно сообщить об этом в
            службу поддержки Компании.
          </li>
          <li>Запрещается передавать Велосипед третьим лицам без письменного согласия Компании.</li>
        </ul>

        <h2 className="text-lg font-semibold">4. Возврат Велосипеда</h2>
        <ul className="list-disc list-inside ml-4">
          <li>
            Арендатор обязан вернуть Велосипед в оговорённое время и место, указанное в договоре
            аренды.
          </li>
          <li>
            При возврате Велосипеда арендатор обязан убедиться, что Велосипед чист и не имеет новых
            повреждений.
          </li>
          <li>
            Если при возврате Велосипеда выявлены повреждения, вызванные неправильной эксплуатацией,
            Компания вправе взыскать стоимость ремонта.
          </li>
        </ul>

        <h2 className="text-lg font-semibold">5. Изменения и дополнения</h2>
        <p>
          Компания оставляет за собой право вносить изменения в настоящие условия аренды. Новая
          редакция условий вступает в силу с момента её публикации на сайте Компании. Продолжение
          использования услуг Компании означает согласие арендатора с внесёнными изменениями.
        </p>

        <p>
          Если у вас остались вопросы или предложения относительно условий аренды, свяжитесь,
          пожалуйста, со службой поддержки Компании.
        </p>
      </div>
    </div>
  );
}
