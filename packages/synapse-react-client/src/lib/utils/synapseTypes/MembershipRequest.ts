// https://rest-docs.synapse.org/rest/org/sagebionetworks/repo/model/MembershipRequest.html
export type MembershipRequest = {
  id: string
  teamId: string
  userId: string
  message?: string //The request message (optional).
  expiresOn?: string //The date this request expires (optional).
  createdOn: string
  createdBy: string
}
