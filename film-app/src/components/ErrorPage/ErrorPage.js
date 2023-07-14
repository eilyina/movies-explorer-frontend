import './ErrorPage.css'
import { Link } from 'react-router-dom'

function ErrorPage() {

    return (
        <>
            <main className="error">
                <section className="error__section">
                    <h1 className="error__title">404</h1>
                    <p className="error__text">Страница не найдена</p>
                    <Link to="history.back()" className="error__link">Назад</Link>
                </section>
            </main>

        </>
    );
}

export default ErrorPage;
