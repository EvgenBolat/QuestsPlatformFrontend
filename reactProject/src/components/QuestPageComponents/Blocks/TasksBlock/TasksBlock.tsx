import Card from "../../../genericClasses/Card";
import "./TasksBlock.css"

// const TypeOfImage = (isLast: boolean) => {
//     return isLast ?
//     'standartBlock.svg' :
//     'standartBlockWithArrow.svg'

// }
const TasksBlock = (props: any) => {
    let classes = "TasksBlock " + props.className ;
    if(props.isStarted){
        classes += " isStarting"
    }
    return (
        <button className="TaskBlockButton"
        onDragStart={(e) => props.dragStart(e , props.data)}
        onDragLeave={(e) => props.dragEnd(e)}
        onDragEnd={(e) => props.dragEnd(e)}
        onDragOver={(e) => props.dragOver(e)}
        onDrop={(e) => props.drop(e, props.data)}
        draggable={true}
        disabled={props.isStarted}
        onClick={(e) =>{
            console.log(props.isShaffled)
            if(props.isSaved === false || props.isShaffled === true){
                alert("Вы не сохранили изменения в списке блоков!")
                return
            }
            if(props.data.id === -1 || props.data.id === -2){
                return
            }
            props.setBlockWindowID(props.data.id)
            props.setCurrentCard(props.data)
            props.setBlockWindowActive(true)
            props.setactionMenuData(props.data)
        }}
        >
        <Card className= {classes}>
            <img draggable={false} className="BlockImage" src={props.data.block_type === 0 ?`${process.env.PUBLIC_URL}/img/standartBlock.svg` : `${process.env.PUBLIC_URL}/img/parallelBlock.svg`} alt="there is block" />
            <span className="BlockName">{props.data.block_name}</span>
        </Card>
        </button>
    )
}

export default TasksBlock;