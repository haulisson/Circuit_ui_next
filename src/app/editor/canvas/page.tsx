import dynamic from "next/dynamic";
const CanvasHost = dynamic(() => import("../CanvasHost"), { ssr: false });
export default function Page(){ return <CanvasHost/>; }
