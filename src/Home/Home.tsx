import ClassesViewer from "./ClassesView";
import HomeBar from "./HomeBar";

export default function Home() {
    return <>
        <HomeBar style={{
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            width: '98vw',
            margin: 'auto',
        }}></HomeBar>
        <ClassesViewer style={{
            marginTop: '10px',
            overflowX: 'auto'
        }}></ClassesViewer>
    </>;
}
