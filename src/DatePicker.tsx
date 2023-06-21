import React from "react";

declare const manywho: any;

export default class InputDateTime extends React.Component<any, any> {

    datePicker: HTMLInputElement;

    constructor(props: any) {
        super(props);
        this.getFormatedDate = this.getFormatedDate.bind(this);
        this.state = {date: undefined, inputType: "date"};
    }

    componentDidMount(){ 
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const state = manywho.state.getComponent(this.props.id, this.props.flowKey);

        let useCurrent = false;
        let customFormat = null;
        let isDateOnly: boolean = false;
        let isTimeOnly: boolean=false;

        if (model.attributes) {
            if (model.attributes.useCurrent !== undefined)
                useCurrent = manywho.utils.isEqual(model.attributes.useCurrent, 'true', true) ?
                    true :
                    false;

            if (model.attributes.dateTimeFormat)
                customFormat = model.attributes.dateTimeFormat;
        }

        if (customFormat) {
            isDateOnly =
                customFormat.toLowerCase().indexOf('h') === -1 &&
                customFormat.indexOf('m') === -1 && // minute is always lower case, M is always month
                customFormat.toLowerCase().indexOf('s') === -1;

            if (!isDateOnly) {
                isTimeOnly =
                    (customFormat.toLowerCase().indexOf('h') > -1 &&
                    customFormat.indexOf('m') > -1 ||
                    customFormat.toLowerCase().indexOf('s') > -1)
                    &&
                    (customFormat.toLowerCase().indexOf('y') === -1 &&
                    customFormat.toLowerCase().indexOf('d') === -1 &&
                    customFormat.indexOf('M') === -1);
            }
        }

        // Seems that the Bootstrap datepicker ignores Reacts
        // autoFocus attribute... so will have to manually open the picker
        if (model.autoFocus) {
            this.datePicker.focus();
        }

        let inputType: String;
        switch(true) {
            case isDateOnly:
                inputType = "date";
                break;
            case isTimeOnly:
                inputType="time";
                break;
            default:
                inputType="datetime-local"
        }
        let date: Date;
        if(state.contentValue){
            date = new Date(state.contentValue);
        }
    
        if(isNaN(date?.getTime())) {
            if(useCurrent===true) {
                date = new Date();
            }
            else {
                date = undefined;
            }
        }

        this.setState({date: date, inputType: inputType});
    }

    componentDidUpdate() {
        const newDate = this.props.value === ''
            ? null
            : this.props.value;
        //this.setPickerDate(newDate);
    }

    getFormatedDate() : string {
        let dateString: string;
        if(this.state.date && !isNaN(this.state.date.getTime())) {
            switch(this.state.inputType) {
                case "date":
                    dateString = (this.state?.date as Date)?.toISOString().substring(0,10);
                    break;
                case "time":
                    dateString = (this.state?.date as Date)?.toISOString().substring(11,17);
                    break;
                case "datetime-local":
                default:
                    dateString = (this.state?.date as Date)?.toISOString().substring(0,16);
                    break;
            }
        }
        return dateString;
    }

    onChange = (e:any) => {
        let  dt: Date = new Date(e.currentTarget.value);
        var userTimezoneOffset = dt.getTimezoneOffset() * 60000;
        dt = new Date(dt.getTime() - userTimezoneOffset);
        if(isNaN(dt.getTime())) {
            this.props.onChange('');
        }
        else {
            this.props.onChange(dt.toISOString());
        }
        
        this.setState({date: dt});
    }

   

    
    

    render() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);   
            
        return (
            <input 
                id={this.props.id}
                placeholder={this.props.placeholder}
                className="form-control datepicker"
                ref={(element: HTMLInputElement) => {this.datePicker=element}}
                type={this.state.inputType}
                size={this.props.size}
                readOnly={this.props.readOnly}
                disabled={this.props.disabled}
                required={this.props.required}
                onBlur={this.props.onBlur}
                autoComplete={this.props.autoComplete}
                autoFocus={model.autoFocus}
                onChange={this.onChange}
                value={this.getFormatedDate()}
            />
        );
    }
}

manywho.component.register('input-datetime', InputDateTime);