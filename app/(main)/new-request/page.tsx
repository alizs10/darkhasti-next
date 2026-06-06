import NewRequest from "@/app/components/new-request/NewRequest";
import { AttachedFilesProvider } from "@/app/context/AttachedFilesContext";

export default function NewRequestPage() {
    return (
        <AttachedFilesProvider attachable_type="App\Models\Request">
            <NewRequest />
        </AttachedFilesProvider>
    )
}
