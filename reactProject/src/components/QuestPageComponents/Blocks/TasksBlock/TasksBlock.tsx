import Card from "../../../genericClasses/Card";
import "./TasksBlock.css"

// const TypeOfImage = (isLast: boolean) => {
//     return isLast ?
//     'standartBlock.svg' :
//     'standartBlockWithArrow.svg'

// }
const TasksBlock = (props: any) => {
    const classes = "TasksBlock " + props.className;
    return (
        <button className="TaskBlockButton"
        onDragStart={(e) => props.dragStart(e , props.data)}
        onDragLeave={(e) => props.dragEnd(e)}
        onDragEnd={(e) => props.dragEnd(e)}
        onDragOver={(e) => props.dragOver(e)}
        onDrop={(e) => props.drop(e, props.data)}
        draggable={true}
        onClick={(e) =>{
            if(props.data.id === -1 || props.data.id === -2){
                return
            }
            props.setBlockWindowActive(true)
            props.setactionMenuData(props.data)
        }}
        >
        <Card className= {classes}>
            <img draggable={false} className="BlockImage" src={`${process.env.PUBLIC_URL}/img/standartBlock.svg`} alt="there is block" />
            <span className="BlockName">{props.data.name}</span>
        </Card>
        </button>
    )
}

export default TasksBlock;