import Link from "next/link";
import React from "react";

export default function Terms() {
  return (
    <section className="tabs-section layout-radius">
      <div className="boxcar-container">
        <div className="boxcar-title-three">
          <ul className="breadcrumb">
            <li>
              <Link href={`/`}>Главная</Link>
            </li>
            <li>
              <span>Условия и положения</span>
            </li>
          </ul>
          <h2>Условия и положения</h2>
        </div>
        <div className="row">
          <div className="tabs-column col-lg-3 col-md-4 col-sm-12">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                    className="nav-link active"
                    id="Account&Payments-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Account&Payments"
                    type="button"
                    role="tab"
                    aria-controls="Account&Payments"
                    aria-selected="true"
                >
                  Политика аренды
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                    className="nav-link"
                    id="ManageOrders-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#ManageOrders"
                    type="button"
                    role="tab"
                    aria-controls="ManageOrders"
                    aria-selected="false"
                >
                  Политика возврата
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                    className="nav-link"
                    id="COVID-19-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#COVID-19"
                    type="button"
                    role="tab"
                    aria-controls="COVID-19"
                    aria-selected="false"
                >
                  Ответственность арендатора
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                    className="nav-link"
                    id="Other-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Other"
                    type="button"
                    role="tab"
                    aria-controls="Other"
                    aria-selected="false"
                >
                  Политика Конфиденциальности
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                    className="nav-link"
                    id="Other-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Other"
                    type="button"
                    role="tab"
                    aria-controls="Other"
                    aria-selected="false"
                >
                  Обработка персональных данных
                </button>
              </li>
            </ul>
          </div>
          <div className="content-column col-lg-9 col-md-8 col-sm-12">
            <div className="tab-content" id="myTabContent">
              <div
                  className="tab-pane fade show active"
                  id="Account&Payments"
                  role="tabpanel"
                  aria-labelledby="Account&Payments-tab"
              >
                <div className="right-box">
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">1. ОБЩИЕ ПОЛОЖЕНИЯ</h6>
                    <div className="text v2">
                      1.1.	Настоящая Политика обработки файлов cookie ТОО «MD Line (МД Лайн)» (далее – Политика)
                      разработана во исполнение требований Закона Республики Казахстан от «21» мая 2013 года № 94-V «О персональных данных и их защите», Закона Республики Казахстан от 24 ноября 2015 года № 418-V «Об информатизации» и иными нормативными правовыми актами Республики Казахстан (далее совместно - Закон) в целях защиты персональных данных
                      пользователей сайта www.deli-bike.kz (далее – Сайт), являющихся субъектами персональных данных.
                    </div>
                    <div className="text">
                      1.2.	Политика разъясняет пользователям какие типы файлов cookie используются на Сайте, для каких целей и каким образом ТОО «MD Line (МД Лайн)» (далее – Организация) обрабатывает файлы cookie.
                    </div>

                    <div className="text">
                      1.3.	Файлы сookie — это небольшие файлы с данными, которые размещаются (хранятся) на устройстве пользователя (компьютере, смартфоне, планшете, смарт-часах или иных устройств с операционной системой), когда он посещает Сайт.
                    </div>
                    <div className="text">
                      1.4.	Полученная при использовании файлов сookie информация может включать сведения о браузере и устройстве пользователя, данные, собранные в процессе автоматического электронного взаимодействия устройства пользователя и Сайта, в том числе географические и геолокационные, а также статистическую и маркетинговую информацию.
                    </div>
                    <div className="text">
                      1.5.	Организация обрабатывает файлы cookie в целях:
                      -	корректного функционирования Сайта и повышение удобства его использования;
                      -	сбора аналитической информации в обобщённом виде для оценки и дальнейшего улучшения работы Сайта;
                      -	предоставление персонализированной рекламы с учётом интересов пользователей Сайта.
                    </div>
                    <div className="text">
                      1.6.	Организация не использует файлы cookie для идентификации конкретного пользователя Сайта.
                    </div>
                    <div className="text">
                      1.7.	Обеспечение неограниченного доступа к Политике реализуется путём ее публикации в открытом доступе на Сайте.
                    </div>
                    <div className="text">
                      1.8.	Настоящая Политика действует с момента её утверждения.
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">2. ТИПЫ ФАЙЛОВ COOKIE ИСПОЛЬЗУЕМЫХ ТОО «MD Line (МД Лайн)»</h6>
                    <div className="text v2">
                      2.1.	Сайт Организации использует следующие типы файлов cookie:
                    </div>
                    <div className="text">
                      2.1.1.	Технические/функциональные файлы cookie: используются для осуществления базовых функций и корректного отображения содержимого Сайта в браузере пользователя, например, сохранение настроек пользователя, поддержка аутентификации, обеспечение безопасности и конфиденциальности данных, управление сессией пользователя и предоставление технической поддержки. Данный тип файлов является обязательным и не подлежит отключению.
                    </div>
               <div className="text">
                 2.1.2.	Аналитические файлы cookie: используются Организацией для оценки пользовательской активности на Сайте, анализируются сведения взаимодействия пользователя с Сайтом. Эти файлы cookie собирают данные, такие как IP-адрес, тип браузера, платформа, язык, посещённые страницы, время нахождения на сайте и другую аналитическую информацию. Данный тип файлов анонимизируется (обезличивается) и не содержат персональные данные пользователей.
               </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">3. Content and Ideas</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="ManageOrders"
                role="tabpanel"
                aria-labelledby="ManageOrders-tab"
              >
                <div className="right-box">
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">1. Introduction</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">2. Your Use of the Boxcar Sites</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">3. Content and Ideas</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="COVID-19"
                role="tabpanel"
                aria-labelledby="COVID-19-tab"
              >
                <div className="right-box">
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">1. Introduction</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">2. Your Use of the Boxcar Sites</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">3. Content and Ideas</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Other"
                role="tabpanel"
                aria-labelledby="Other-tab"
              >
                <div className="right-box">
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">1. Introduction</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">2. Your Use of the Boxcar Sites</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                  {/* content-box */}
                  <div className="content-box">
                    <h6 className="title">3. Content and Ideas</h6>
                    <div className="text v2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Risus nascetur morbi nisl, mi, in semper metus porttitor
                      non. Augue nunc amet fringilla sit. Fringilla eget arcu
                      sodales sed a, parturient fermentum amet scelerisque. Amet
                      purus urna, dictumst aliquet aliquam natoque non, morbi
                      pretium. Integer amet fermentum nibh viverra mollis
                      consectetur arcu, ultrices dolor. Gravida purus arcu
                      viverra eget. Aliquet tincidunt dignissim aliquam tempor
                      nec id. Habitant suscipit sit semper duis odio amet, at.
                    </div>
                    <div className="text">
                      Massa ultricies a arcu velit eget gravida purus ultrices
                      eget. Orci, fames eu facilisi justo. Lacus netus a at sed
                      justo vel leo leo pellentesque. Nulla ut laoreet luctus
                      cum turpis et amet ac viverra. Vitae neque orci dui eu ac
                      tincidunt. Egestas placerat egestas netus nec velit
                      gravida consectetur laoreet vitae. Velit sed enim habitant
                      habitant non diam. Semper tellus turpis tempus ac leo
                      tempor. Ultricies amet, habitasse adipiscing bibendum
                      consequat amet, sed. Id convallis suspendisse vitae,
                      lacinia mattis cursus montes, dui. Tortor lobortis
                      dignissim eget egestas. Eget enim auctor nunc eget mattis
                      sollicitudin senectus diam. Tincidunt morbi egestas
                      dignissim eget id aliquam
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
