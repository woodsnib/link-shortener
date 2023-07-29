import LinksCreateForm from "./createForm"
import LinksHTMLTable from "./table"

export default function LinksPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LinksCreateForm />
      <LinksHTMLTable />
    </main>
  )
}
