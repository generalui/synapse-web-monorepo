import React from 'react'
import { getUserProfileWithProfilePicAttached } from '../utils/functions/getUserData'
import { UserProfileList } from '../utils/SynapseClient'
import { MEDIUM_USER_CARD, UserCardSize } from '../utils/SynapseConstants'
import {
  ColumnTypeEnum,
  QueryResultBundle,
  UserProfile,
} from '../utils/synapseTypes/'
import UserCard from './UserCard'
import { without } from 'lodash-es'

export type UserCardListProps = {
  /* The list of user IDs or null values to render. For null values, the card will be rendered with table data supplied by `firstName`, `lastName`, and `institution` columns supplied by the data prop.  */
  list: (string | null)[]
  size?: UserCardSize
  // Data should not be needed, however, it gives the option to fill in a user profile with other column
  // fields. This is required specifically by AMP-AD Explore/People page
  data?: QueryResultBundle
}

type MapOwnerIdToUserProfile = {
  [index: number]: UserProfile
}
export type UserCardListState = {
  userProfileMap: MapOwnerIdToUserProfile
}
export default class UserCardList extends React.Component<
  UserCardListProps,
  UserCardListState
> {
  constructor(props: UserCardListProps) {
    super(props)
    this.state = {
      userProfileMap: {},
    }
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    const { list } = this.props
    this.update(list)
  }

  componentDidUpdate(prevProps: UserCardListProps) {
    const priorListOfIds = prevProps.list
    const newValues = without(
      this.props.list.filter(el => el),
      ...priorListOfIds,
    )
    // check that the props have changed by seeing that at least one element is different
    if (newValues.length > 0) {
      this.update(newValues)
    }
  }

  update(list: (string | null)[]) {
    getUserProfileWithProfilePicAttached(
      list.filter((el): el is string => !!el),
    )
      .then((data: UserProfileList) => {
        const newEntries = {}
        data.list.forEach(el => {
          const { ownerId } = el
          newEntries[ownerId] = el
        })
        this.setState({
          userProfileMap: { ...this.state.userProfileMap, ...newEntries },
        })
      })
      .catch((err: string) => {
        console.error('Error on batch call =', err)
      })
  }

  /**
   * Given data this will find rows where there is no userId columnType and create faux user profiles
   * using firstName, lastName, and institution (company in UserProfile object).
   * @param {QueryResultBundle} data
   * @returns list of UserProfiles with firstName, lastName, company, userName (first letter of firstName) filled out.
   * @memberof UserCardList
   */
  manuallyExtractData(data: QueryResultBundle) {
    const firstNameIndex = data.queryResult!.queryResults.headers.findIndex(
      el => el.name === 'firstName',
    )
    const lastNameIndex = data.queryResult!.queryResults.headers.findIndex(
      el => el.name === 'lastName',
    )
    const institutionIndex = data.queryResult!.queryResults.headers.findIndex(
      el => el.name === 'institution',
    )
    const ownerId = data.queryResult!.queryResults.headers.findIndex(
      el => el.columnType === ColumnTypeEnum.USERID,
    )
    const nullOwnerIdsRows = data.queryResult!.queryResults.rows.filter(
      el => !el.values[ownerId],
    )
    return nullOwnerIdsRows.map<Omit<UserProfile, 'ownerId'>>(el => {
      const values = el.values
      return {
        firstName: values[firstNameIndex] ?? '',
        lastName: values[lastNameIndex] ?? '',
        company: values[institutionIndex] ?? undefined,
        ownerId: null,
        userName: values[firstNameIndex]
          ? values[firstNameIndex]![0] ?? ''
          : '',
      }
    })
  }

  render() {
    const { size = MEDIUM_USER_CARD, data, list } = this.props
    const { userProfileMap = {} } = this.state
    const fauxUserProfilesList = data && this.manuallyExtractData(data)
    let fauxUserProfileIndex = 0
    return (
      <div className="SRC-card-grid-row">
        {
          // we loop through the list from the props because thats the 'active set of data' whereas the data stored in state could be stale
          list.map(ownerId => {
            const userProfile = ownerId != null ? userProfileMap[ownerId] : null
            if (userProfile) {
              return (
                <div
                  key={JSON.stringify(userProfile)}
                  className="SRC-grid-item SRC-narrow-grid-item"
                >
                  <UserCard
                    size={size}
                    preSignedURL={userProfile.clientPreSignedURL}
                    userProfile={userProfile}
                  />
                </div>
              )
            }
            const fauxUserProfile =
              fauxUserProfilesList && fauxUserProfilesList[fauxUserProfileIndex]
            if (!fauxUserProfile) {
              // This could happen in one of two cases:
              // - The props just updated with a new userlist where the data is being gathered for this particular user
              //   OR there is no mapping for this user
              return false
            }
            fauxUserProfileIndex += 1
            return (
              <div
                key={JSON.stringify(fauxUserProfile)}
                className="SRC-grid-item SRC-narrow-grid-item"
              >
                <UserCard
                  disableLink={true}
                  hideEmail={true}
                  size={size}
                  // TODO: Modify UserCard to accept a fake profile with no ownerId field, and remove this cast.
                  userProfile={fauxUserProfile as UserProfile}
                />
              </div>
            )
          })
        }
      </div>
    )
  }
}
