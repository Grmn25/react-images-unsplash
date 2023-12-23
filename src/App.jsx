import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import './header.css';
import './content.css';
import './article.css';

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchDefaultImages = async () => {
      try {
        const response = await fetch(
          'https://api.unsplash.com/photos?per_page=20',
          {
            headers: {
              Authorization: 'Client-ID wk4FIe_1kEizu_qK5TVJFZBZs-XcZFbTPmqopmCkXjA',
            },
          }
        );
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching default images:', error);
      }
    };

    fetchDefaultImages();
  }, []);

  const open = (url) => window.open(url);

  const apiKey = import.meta.env.VITE_API_KEY

  return (
    <div>
      <header>
        <h1>Unsplash Images</h1>
        <div className="search">
          <Formik
            initialValues={{ search: '' }}
            onSubmit={async (values) => {
              const response = await fetch(
                `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
                {
                  headers: {
                    Authorization:
                      `Client-ID ${apiKey}`,
                  },
                }
              );
              const data = await response.json();
              setImages(data.results);
            }}
          >
            <Form>
              <Field name="search" placeholder="Search" />
            </Form>
          </Formik>
        </div>
        <div className='github'>
        <a href="https://github.com/Grmn25/react-images-unsplash" target="_blank" rel="noopener noreferrer">
            <img
              src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
              alt='GitHub' />
          </a>
        </div>
      </header>
      <div className='container'>
        <div className='center'>
          {images.map((image) => (
            <article key={image.id} onClick={() => open(image.links.html)}>
              <img
                src={image.urls.regular}
                alt={image.description || image.alt_description}
              />
              <p>{[image.description, image.alt_description].join(' - ')}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
