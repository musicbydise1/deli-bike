import { carGroups } from "@/data/categories";
import React from "react";

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
          <ul className="nav nav-tabs wow fadeInUp" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                  className="nav-link active"
                  id="moped-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#moped"
                  type="button"
                  role="tab"
                  aria-controls="moped"
                  aria-selected="true"
              >
                Мопед
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                  className="nav-link"
                  id="foot-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#foot"
                  type="button"
                  role="tab"
                  aria-controls="foot"
                  aria-selected="false"
              >
                Пешком
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
          <div className="tab-content wow fadeInUp" id="myTabContent">
            {/* Таб для мопеда */}
            <div
                className="tab-pane fade show active"
                id="moped"
                role="tabpanel"
                aria-labelledby="moped-tab"
            >
              <table className="comparison-table">
                <thead>
                <tr>
                  <th>Параметр</th>
                  <th>Мопед</th>
                  <th>С электровелосипедом</th>
                  <th>Выгода</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Скорость</td>
                  <td>40–60 км/ч</td>
                  <td>40–55 км/ч</td>
                  <td>Сопоставимая скорость</td>
                </tr>
                <tr>
                  <td>Расход на бензин</td>
                  <td>~800 тенге/день</td>
                  <td>~50–100 тенге/день</td>
                  <td>Экономия ~21 000 тенге/мес</td>
                </tr>
                <tr>
                  <td>Расход на ремонт</td>
                  <td>~5 000–10 000 тенге/мес</td>
                  <td>Меньше ремонта (нет ДВС, масла и т.д.)</td>
                  <td>Меньше затрат на ремонт</td>
                </tr>
                <tr>
                  <td>Пробег за день</td>
                  <td>Зависит от бака</td>
                  <td>До 90 км (запасной аккумулятор возможен)</td>
                  <td>Достаточно для всей смены</td>
                </tr>
                <tr>
                  <td>Доход в месяц</td>
                  <td>Меньше из-за больших расходов</td>
                  <td>Больше. Расход 3000 тенге/месяц</td>
                  <td>Экономия до 300 000 тенге в год</td>
                </tr>
                <tr>
                  <td>Итоговая выгода</td>
                  <td>Меньше из-за больших расходов</td>
                  <td>Высокие расходы на бензин и ремонт</td>
                  <td>+300 000 тенге в год</td>
                </tr>
                </tbody>
              </table>
            </div>

            {/* Остальные табы */}
            <div
                className="tab-pane fade"
                id="foot"
                role="tabpanel"
                aria-labelledby="foot-tab"
            >
              <p>Данные для пешком будут здесь...</p>
            </div>
            <div
                className="tab-pane fade"
                id="car"
                role="tabpanel"
                aria-labelledby="car-tab"
            >
              <p>Данные для авто будут здесь...</p>
            </div>
          </div>
        </div>
      </section>
  );
}