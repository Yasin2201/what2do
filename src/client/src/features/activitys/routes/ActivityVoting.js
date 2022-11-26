import { ContentLayout } from "@/components/Layout/ContentLayout"
import { Voting } from "../components/voting/Voting"

export const ActivityVoting = () => {
  return (
    <ContentLayout title="Activity">
      <div className="mt-4">
        <Voting />
      </div>
    </ContentLayout>
  )
}