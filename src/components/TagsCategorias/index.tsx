import { Link } from 'react-router-dom';
import './TagsCategorias.scss'

const TagsCategorias = () => {

    const tags = [
        { name: 'Eletrônicos', path: '/categorias/eletronicos' },
        { name: 'Informática', path: '/categorias/informatica' },
        { name: 'Cozinha ', path: '/categorias/cozinha' },
        { name: 'Áudio ', path: '/categorias/audio-e-video' },
        { name: ' Jogos', path: '/categorias/games' },
    ];

    return (
        <section className="TagsCategorias">
            <h4>CATEGORIAS MAIS BUSCADAS</h4>
            <div className="container">
                {tags.map(tag => 
                    <Link to={tag.path} key={tag.name} className="tag-button">{tag.name}</Link>
                )}
            </div>
        </section>
    )
}

export default TagsCategorias;
