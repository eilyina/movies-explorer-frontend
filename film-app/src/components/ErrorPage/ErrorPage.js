import './ErrorPage.css'
import { useNavigate } from 'react-router-dom'

function ErrorPage(props) {
    const navigate = useNavigate();

    function handleBackButton() {
        navigate(-1)
    }

    return (
        <>
            <main className="error">
                <section className="error__section">
                    <h1 className="error__title">404</h1>
                    <p className="error__text">Страница не найдена</p>
                    <button onClick={handleBackButton} className="error__link">Назад</button>
                </section>
            </main>

        </>
    );
}

export default ErrorPage;
