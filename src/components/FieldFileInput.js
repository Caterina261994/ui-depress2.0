import React, {Component} from 'react'
import '../App.css';

export default class FieldFileInput  extends Component{
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const { input: { onChange } } = this.props
        onChange(e.target.files)
    }

    render(){
        const { input: { value } } = this.props
        const {input,label, required, meta, } = this.props  //whatever props you send to the component from redux-form Field
        return(
                <div>
                    <input
                        type="file"
                        name="images"
                        id="imgid"
                        className="imgcls align-end"
                        multiple
                        onChange={this.onChange}
                    />
                </div>
        )
    }
}