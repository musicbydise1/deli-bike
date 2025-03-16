import React from "react";
import Image from "next/image";

export default function Features3() {
  return (
      <section className="cars-section">
        <div className="boxcar-container">
          <div className="boxcar-title categ wow fadeInUp">
            <h2>
              На чём ездить <span style={{ color: "var(--theme-color1)" }}>выгоднее?</span>
            </h2>
            <p>Пешком, мопед, авто или электровелосипед — посмотрите, где самая большая выгода</p>
          </div>

          {/* Навигация по вкладкам */}
          <ul className="nav nav-tabs wow fadeInUp" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                  className="nav-link active"
                  id="foot-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#foot"
                  type="button"
                  role="tab"
                  aria-controls="foot"
                  aria-selected="true"
              >
                Пешком
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                  className="nav-link"
                  id="moped-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#moped"
                  type="button"
                  role="tab"
                  aria-controls="moped"
                  aria-selected="false"
              >
                Мопед
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                  className="nav-link"
                  id="car-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#car"
                  type="button"
                  role="tab"
                  aria-controls="car"
                  aria-selected="false"
              >
                Авто
              </button>
            </li>
          </ul>

          {/* Содержимое вкладок */}
          <div className="tab-content wow fadeInUp" id="myTabContent">
            {/* --- Вкладка «Пешком» --- */}
            <div
                className="tab-pane fade show active"
                id="foot"
                role="tabpanel"
                aria-labelledby="foot-tab"
            >
              <div className="row">
                {/* Левая часть с таблицей */}
                <div className="col-md-9">
                  <table className="comparison-table">
                    <thead>
                    <tr>
                      <th>Параметр</th>
                      <th>Пешком</th>
                      <th>Deli-Bike</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Скорость (в городе)</td>
                      <td>Медленно</td>
                      <td>+54%</td>
                    </tr>
                    <tr>
                      <td>Бензин, день</td>
                      <td>Нет затрат</td>
                      <td>Нет затрат</td>
                    </tr>
                    <tr>
                      <td>Ремонт/ТО, мес</td>
                      <td>Нет затрат</td>
                      <td>Нет затрат</td>
                    </tr>
                    <tr>
                      <td>Пробег за день, км</td>
                      <td>Ограничен</td>
                      <td>До 90 км на 1 АКБ</td>
                    </tr>
                    <tr>
                      <td>Количество заказов в день</td>
                      <td>Ограничено</td>
                      <td>В 3–5 раз больше</td>
                    </tr>
                    <tr>
                      <td>Доход в месяц</td>
                      <td>Ограничен / фиксирован</td>
                      <td>В 3–4 раза выше</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                {/* Правая часть с изображением */}
                <div className="col-md-3 d-flex align-items-center">
                  {/* Укажите свои пути, ширину и высоту */}
                  <Image
                      src="/images/foot.jpg"
                      alt="Пешком"
                      width={350}      // ваша ширина
                      height={350}     // ваша высота
                      className="table-images"
                  />
                </div>
              </div>
            </div>

            {/* --- Вкладка «Мопед» --- */}
            <div
                className="tab-pane fade"
                id="moped"
                role="tabpanel"
                aria-labelledby="moped-tab"
            >
              <div className="row">
                {/* Левая часть с таблицей */}
                <div className="col-md-9">
                  <table className="comparison-table">
                    <thead>
                    <tr>
                      <th>Параметр</th>
                      <th>Мопед</th>
                      <th>Deli-Bike</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Скорость (в городе)</td>
                      <td>Сопоставима (40–60 км/ч)</td>
                      <td>Сопоставима (40–55 км/ч)</td>
                    </tr>
                    <tr>
                      <td>Бензин, день</td>
                      <td>~800 тенге</td>
                      <td>Нет затрат</td>
                    </tr>
                    <tr>
                      <td>Ремонт/ТО, мес</td>
                      <td>5 000–10 000 тенге</td>
                      <td>Меньше (нет ДВС, масла и т.д.)</td>
                    </tr>
                    <tr>
                      <td>Пробег за день</td>
                      <td>Неограничен (зависит от бака)</td>
                      <td>До 90 км (запасной АКБ)</td>
                    </tr>
                    <tr>
                      <td>Количество заказов в день</td>
                      <td>Ограничено пробками</td>
                      <td>~+24% заказов</td>
                    </tr>
                    <tr>
                      <td>Доход в месяц</td>
                      <td>
                        Ниже на 40 000–60 000 тенге <br />
                        (без учёта аренды)
                      </td>
                      <td>В 2–3 раза выше</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                {/* Правая часть с изображением */}
                <div className="col-md-3 d-flex align-items-center">
                  <Image
                      src="/images/moped.jpg"
                      alt="Мопед"
                      width={350}
                      height={350}
                      className="table-images"
                  />
                </div>
              </div>
            </div>

            {/* --- Вкладка «Авто» --- */}
            <div
                className="tab-pane fade"
                id="car"
                role="tabpanel"
                aria-labelledby="car-tab"
            >
              <div className="row">
                {/* Левая часть с таблицей */}
                <div className="col-md-9">
                  <table className="comparison-table">
                    <thead>
                    <tr>
                      <th>Параметр</th>
                      <th>Автомобиль</th>
                      <th>Deli-Bike</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>Скорость (в городе)</td>
                      <td>Сопоставима</td>
                      <td>Сопоставима</td>
                    </tr>
                    <tr>
                      <td>Бензин, день</td>
                      <td>1 200–2 400 тенге</td>
                      <td>Нет затрат</td>
                    </tr>
                    <tr>
                      <td>Ремонт/ТО, мес</td>
                      <td>25 000–50 000 тенге</td>
                      <td>Меньше (нет ДВС, масла и т.д.)</td>
                    </tr>
                    <tr>
                      <td>Пробег за день</td>
                      <td>Неограничен (зависит от бака)</td>
                      <td>До 90 км (запасной АКБ)</td>
                    </tr>
                    <tr>
                      <td>Количество заказов в день</td>
                      <td>Ограничено пробками</td>
                      <td>~+37% заказов</td>
                    </tr>
                    <tr>
                      <td>Доход в месяц</td>
                      <td>
                        Ниже на 80 000–150 000 тенге <br />
                        (без учёта аренды авто)
                      </td>
                      <td>В 2,5–3,5 раза выше</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                {/* Правая часть с изображением */}
                <div className="col-md-3 d-flex align-items-center">
                  <Image
                      src="/images/car.jpg"
                      alt="Автомобиль"
                      width={350}
                      height={350}
                      className="table-images"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}