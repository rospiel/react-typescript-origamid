import { inputStyle, labelStyle } from "./DateInputStyles";

type DateInputProps = React.ComponentProps<'input'> & {
    label: string;
}

export default function DateInput({ label, ...props }: DateInputProps) {
    return (
        <div>
            <label style={labelStyle} htmlFor={label}>{label}</label>
            <input style={inputStyle} id={label} name={label} type="date" {...props} />
        </div>
    )
}