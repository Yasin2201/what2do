import { ContentLayout } from "@/components/Layout/ContentLayout"
import { CreateActivity } from "../../components/CreateActivity"
import { VotingActivitysList } from "../../components/Voting/VotingActivitysList"

export const VotingActivitys = () => {
  return (
    <ContentLayout title="Activities">
      <CreateActivity />
      <div className="mt-4 h-[75vh] overflow-scroll">
        <VotingActivitysList />
      </div>
    </ContentLayout>
  )
}