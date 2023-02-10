import { Component } from 'react'
import React from 'react'
import './NewIdea.css';
import { Editor } from '@tinymce/tinymce-react'


export default class NewSpot extends Component {
    
    state = {
        title: '',
        thesis: null,
        ticker: '',
        stockPrice: '',
        longOrShort: '',
    }
    
    
    onEditorChange = (thesis) => {
        this.setState({thesis})
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    handleTickerChange = async (e) => {
        this.setState({ticker: e.target.value})

        let API_KEY = process.env.REACT_APP_MARKETSTACK_ACCESS_KEY
          let stockTicker = e.target.value
          let URL = `http://api.marketstack.com/v1/intraday?access_key=${API_KEY}&symbols=${stockTicker}`
        
        let stockPrice = ''
        if (stockTicker !== '') {
          let response = await fetch(URL)
            let data = await response.json()
            stockPrice = data.data[0].last
        }
        this.setState({stockPrice: stockPrice})
    }

    handleSubmit = async () => {
        let body = {
            title: this.state.title,
            thesis: this.state.thesis,
            ticker: this.state.ticker.toUpperCase(),
            stockPrice: this.state.stockPrice,
            longOrShort: this.state.longOrShort,
            user: this.props.user
        }

        let options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        await fetch("/api/ideas/create", options)
            .then(res => res.json())
            .then(() =>
                this.setState({
                    title: '',
                    thesis: null,
                    ticker: '',
                    stockPrice: '',
                    longOrShort: '',
                })
            )     
    }

  
    render() {
        return (
          <main>
            <main className="newspot-background-image">
              <form className='newIdeaForm' onSubmit={this.handleSubmit}>
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 fade-edge">
                      <h3 className="title theme-font">Post An Idea</h3>
                      <div className="form-group secondary-font title">
                        <label className="input"><b>Title</b></label>
                        <input type="text" className="form-control" name="title" placeholder="Title" required onChange={this.handleChange} value={this.name}></input>
                      </div>
                      <div className="form-group secondary-font thesis">
                        <label className="input"><b>Thesis</b></label>
                        <Editor
                          thesis={this.state.thesis} 
                          onEditorChange={this.onEditorChange}
                          initialValue='<p>Post your thesis...</p>'
                          init={{
                            statubar: true,
                            height: 500,
                            image_caption: true,
                            image_title: true,
                            image_uploadtab: true,
                            plugins: [
                              "advlist", "autolink", "lists", "link", "image", "charmap",
                              "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                              "insertdatetime", "media", "table", "preview", "help", "wordcount",
                            ],
                            toolbar: "undo redo | blocks | " +
                              "bold italic forecolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "removeformat | help",
                            images_upload_url: '/api/ideas/uploadImage',
                            image_title: true,
                            automatic_uploads: true,
                          }}
                        />
                      </div>
                      <div className="form-group secondary-font ticker">
                        <label className="input"><b>Ticker Symbol </b></label>
                        <input type="text" className="form-control" name="ticker" placeholder="Ticker Symbol" onChange={this.handleTickerChange} value={this.address}></input>
                        {this.state.stockPrice && <label>{this.state.ticker.toUpperCase()} <b>{this.state.stockPrice}</b> USD</label>}
                      </div>
                      <div className="form-group secondary-font">
                        <label className="input"><b>Long or Short</b></label>
                        <select className="form-control" name="longOrShort" placeholder="Long/Short" onChange={this.handleChange}>
                          <option value={this.longOrShort}></option>
                          <option value={this.longOrShort}>Long</option>
                          <option value={this.longOrShort}>Short</option>
                        </select>
                      </div>
                      <input hidden name='user'>{this.props.user.id}</input>
                      <input type='submit' className="btn btn-primary top-buffer-submit"></input>
                    </div>
                  </div>
                </div>
              </form>
            </main>
         </main>
        )
    }
}