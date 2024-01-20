import axios from "../../redux/axios";
import React from "react";
import s from "./AddProduct.module.scss"

function AddProduct() {
    const [title, setTitle] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [author, setAuthor] = React.useState('')
    const [imgUrl, setImgUrl] = React.useState('')
    const [genres, setGenres] = React.useState('')
    const [ageRestriction, setAgeRestriction] = React.useState('')
    const [complexity, setComplexity] = React.useState('')
    const [rating, setRating] = React.useState('')

    const onSubmit = async () => {
        try{
            const fields = {
                title,
                price,
                description,
                author,
                imgUrl,
                genres,
                ageRestriction,
                complexity,
                rating
            }
            const {data } = await axios.post('/products', fields);
            if(data) {
                alert("Товар создан!")
            }
        } catch(err) {
            console.log(err)
        }
    }

    console.log()
    return(
        <div className={s.block__wrapper}>
            <div>
                
                <label htmlFor="title">Title:</label>
                <input type="text" placeholder="title" name="title" value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div>
                
                <label htmlFor="price">Price:</label>
                <input type="number" placeholder="price" name="price" value={price} onChange={e => setPrice(e.target.value)}/>
            </div>
            <div>
                
                <label htmlFor="description">Descriprion:</label>
                <input type="text" placeholder="description" name="description" value={description} onChange={e => setDescription(e.target.value)}/>
            </div>
            <div>
                
                <label htmlFor="author">Author:</label>
                <input type="text" placeholder="author" name="author" value={author} onChange={e => setAuthor(e.target.value)}/>
            </div>
            <div>
                
                <label htmlFor="imgUrl">imgUrl:</label>
                <input type="text" placeholder="imgUrl" name="imgUrl" value={imgUrl} onChange={e => setImgUrl(e.target.value)}/>
            </div>
            <div>
                
                <label htmlFor="genres">Genres:</label>
                <input type="text" placeholder="genres" name="genres" value={genres} onChange={e => setGenres(e.target.value)}/>
            </div>
            <div>
                
                <label htmlFor="ageRestriction">Age Restriction:</label>
                <input type="number" placeholder="ageRestriction" name="ageRestriction" value={ageRestriction} onChange={e => setAgeRestriction(e.target.value)}/>
            </div>
            <div>
                
                <label htmlFor="complexity">Complexity:</label>
                <input type="text" placeholder="complexity" name="complexity" value={complexity} onChange={e => setComplexity(e.target.value)}/>
            </div>
            <div>
                
                <label htmlFor="rating">Rating:</label>
                <input type="number" placeholder="rating" name="rating" value={rating} onChange={e => setRating(e.target.value)}/>
            </div>
            <div>
                <button onClick={onSubmit}>Create Product</button>
            </div>
        </div>
    )
}

export default AddProduct;