import React, { useEffect, useState } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { useInView } from 'react-intersection-observer'
import { PRODUCTION_ENDPOINT_CONFIG } from '../../utils/functions/getEndpoint'
import { useGetUserRegistrableTeamsInfinite } from '../../utils/hooks/SynapseAPI/user/useGetUserRegistrableTeams'
import { SkeletonTable } from '../../assets/skeletons/SkeletonTable'

export type UserRegistrableTeamsProps = {
  challengeId: string
}

export default function UserRegistrableTeams({
  challengeId,
}: UserRegistrableTeamsProps) {
  const [allRows, setAllRows] = useState<string[]>([])
  const handleError = useErrorHandler()
  // Load the next page when this ref comes into view.
  const { ref, inView } = useInView()
  const {
    data,
    status,
    isFetching,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isError,
    error: newError,
  } = useGetUserRegistrableTeamsInfinite(challengeId, 1000)

  useEffect(() => {
    if (isError && newError) {
      handleError(newError)
    }
  }, [isError, newError, handleError])

  useEffect(() => {
    // console.log(
    //   { status },
    //   { isFetching },
    //   { fetchNextPage },
    //   { hasNextPage },
    //   { inView },
    // )
    if (
      status === 'success' &&
      !isFetching &&
      hasNextPage &&
      fetchNextPage &&
      inView
    ) {
      fetchNextPage()
    }
  }, [status, isFetching, hasNextPage, fetchNextPage, inView])

  useEffect(() => {
    const rows = data?.pages.flatMap(page => page.results) ?? []
    setAllRows(rows)
  }, [data])
  //   console.log({ allRows })

  return (
    <>
      {allRows.length > 0 && (
        <>
          {allRows.map((item: string) => {
            if (item) {
              // another option would be to use an EntityLink
              return (
                <p key={`user-team-list-item-${item}`}>
                  <a
                    target="_self"
                    rel="noopener noreferrer"
                    href={`${PRODUCTION_ENDPOINT_CONFIG.PORTAL}#!Team:${item}`}
                  >
                    {item}
                  </a>
                </p>
              )
            } else return false
          })}
          {/* To trigger loading the next page */}
          <div ref={ref} />
        </>
      )}
      {!isFetching && allRows.length == 0 && <div>Empty</div>}
      {isLoading && <SkeletonTable numRows={5} numCols={1} />}
    </>
  )
}
