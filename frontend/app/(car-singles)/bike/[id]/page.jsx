import Single1 from "@/components/carSingles/Single1";
import Header6 from "@/components/headers/Header6";
import Footer1 from "@/components/footers/Footer1";
import Footer3 from "@/components/footers/Footer3";

/**
 * Функция generateStaticParams возвращает список параметров для генерации
 * статических страниц для всех значений динамического сегмента [id].
 */
export async function generateStaticParams() {
    const res = await fetch("http://91.243.71.138:4000/bikes", { cache: "no-store" });
    if (!res.ok) {
        return [];
    }
    const { data } = await res.json();
    return data.map((bike) => ({
        id: bike.id.toString(),
    }));
}

/**
 * Функция generateMetadata позволяет задать title, description и т.д.
 * динамически (на основе данных, полученных с API).
 */
export async function generateMetadata({ params }) {
    const { id } = params;

    // Делаем запрос на ваш сервер
    const res = await fetch(`http://91.243.71.138:4000/bikes/${id}`, { cache: "no-store" });

    // Если получили ошибку — можно выбросить ее или вернуть дефолтные метаданные
    if (!res.ok) {
        return {
            title: "Bike not found",
            description: "Ошибка при загрузке данных о товаре",
        };
    }

    const { data } = await res.json();

    // Извлекаем название и описание из объекта data
    const title = `${data?.name ?? ''} ${data?.model ?? ''}`.trim() || "Bike Details";
    const description = data?.description || "Bike description";

    return {
        title: `${title} || DeliBike - Аренда электровелосипедов`,
        description: description,
    };
}

/**
 * Основной компонент страницы, где вы также fetch'ите данные
 * и рендерите компонент Single1.
 */
export default async function BikePage({ params }) {
    const { id } = params;

    // Запрос к вашему API, чтобы получить данные конкретного байка
    const res = await fetch(`http://91.243.71.138:4000/bikes/${id}`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Не удалось загрузить данные о байке");
    }

    // Парсим результат
    const { data } = await res.json();

    // Прокидываем data в ваш компонент Single1 через prop carItem
    return (
        <>
            <Header6 headerClass="boxcar-header header-style-v1 style-two inner-header cus-style-1" />
            <Single1 carItem={data} />
            <Footer3 parenttClass="boxcar-footer footer-style-five v6" />
        </>
    );
}