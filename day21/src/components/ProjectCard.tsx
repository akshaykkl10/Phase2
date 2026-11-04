import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type ProjectNameProp = {
    title: string;
}

export default function ProjectCard({title}: ProjectNameProp) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
        </Card>
    )
}