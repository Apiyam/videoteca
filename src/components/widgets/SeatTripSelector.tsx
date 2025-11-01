import React, { useEffect, useState } from 'react'
import { Sheet, Typography, CircularProgress, Alert } from '@mui/joy'
import { styled } from '@mui/joy/styles'
import { useAppContext } from "AppContext";
import { ErrorRounded } from '@mui/icons-material';

const busProps = {
    cols: 5,
    rows: 4,
}

// Definición de tipos
interface Seat {
  id: number
  number: number | string
  isSelected?: boolean
  isReserved?: boolean
  tooltip?: string
  orientation?: string
}

interface SeatCallbackProps {
  row: string | number
  number: number | string
  id: number
}

const StyledSeat = styled('button')(({ theme }) => ({
  width: 35,
  height: 35,
  margin: 3,
  border: `1px solid ${theme.palette.neutral[300]}`,
  borderRadius: 4,
  cursor: 'pointer',
  '&.selected': {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.common.white,
  },
  '&.reserved': {
    backgroundColor: theme.palette.neutral[200],
    cursor: 'not-allowed',
  },
  '&:hover:not(.reserved)': {
    backgroundColor: theme.palette.primary[200],
  },
}))

const SeatGrid = styled(Sheet)({
  display: 'grid',
  gridTemplateColumns: `repeat(${busProps.cols}, 1fr)`,
  gap: 2,
  padding: 8,
})

export default function SeatTripSelector({ onSelectSeat }: { onSelectSeat: (seat: number) => void }) {
  const [loading, setLoading] = useState(false)
 // const { bookingData } = useAppContext()
 const [bookingData, setBookingData] = useState({ seats: 0 })
  const [selectedSeats, setSelectedSeats] = useState(0)
  const [showMaxSeatsError, setShowMaxSeatsError] = useState(false)

  useEffect(() => {
    onSelectSeat(selectedSeats)
  }, [selectedSeats])

  const addSeatCallback = ({ row, number, id }: { row: any, number: any, id: any }, addCb: any) => {
    if (selectedSeats >= bookingData.seats) {
      setShowMaxSeatsError(true)
      return
    }
    setLoading(true)
    
    setTimeout(async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
      const newTooltip = `tooltip for id-${id} added by callback`
      addCb(row, number, id, newTooltip)
      setSelectedSeats(selectedSeats + 1)
      setShowMaxSeatsError(false)
      setLoading(false)
    })
  }

  const addSeatCallbackContinuousCase = ({ row, number, id }: { row: any, number: any, id: any }, addCb: any, params: any, removeCb: any) => {
    setLoading(true)
    setTimeout(async () => {
      if (removeCb) {
        await new Promise(resolve => setTimeout(resolve, 750))
        console.log(`Removed seat ${params.number}, row ${params.row}, id ${params.id}`)
        removeCb(params.row, params.number)
      }
      await new Promise(resolve => setTimeout(resolve, 750))
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
      const newTooltip = `tooltip for id-${id} added by callback`
      addCb(row, number, id, newTooltip)
      setLoading(false)
    })
  }

  const removeSeatCallback = ({ row, number, id }: { row: any, number: any, id: any }, removeCb: any) => {
    setLoading(true)
    setTimeout(async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Removed seat ${number}, row ${row}, id ${id}`)
      // A value of null will reset the tooltip to the original while '' will hide the tooltip
      const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
      removeCb(row, number, newTooltip)
      setSelectedSeats(selectedSeats - 1)
      setShowMaxSeatsError(false)
      setLoading(false)
    })
  }

  const [rows, setRows] = useState<Seat[][]>([])
  const seats = [
    [
      { id: 1, number: 1, isSelected: false },
      { id: 2, number: 2, isReserved: false },
      null,
      { id: 3, number: 3, isReserved: true, orientation: "east", tooltip: "Reservado" },
      { id: 4, number: 4, isReserved: true, orientation: "west", tooltip: "Reservado" }
    ],
    [
      { id: 5, number: 5, isReserved: false, tooltip: "Reserved by Matthias Nadler" },
      { id: 6, number: 6, isReserved: false },
      null,
      { id: 7, number: 7, isReserved: false, orientation: "east" },
      { id: 8, number: 8, orientation: "west" }
    ],
    [
      { id: 9, number: 9 },
      { id: 10, number: 10 },
      null,
      { id: 11, number: 11, isReserved: true, orientation: "east" },
      { id: 12, number: 12, orientation: "west" }
    ],
    [
      { id: 13, number: 13, tooltip: "Cost: 25$" },
      { id: 14, number: 14 },
      null,
      { id: 15, number: 15, isReserved: false, orientation: "east" },
      { id: 16, number: 16, isReserved: false, orientation: "west" }
    ],
    [
        null,
        null,
        null,
        null,
        null
      ],
    [
      { id: 17, number: 17, isReserved: false },
      { id: 18, number: 18, orientation: "east" },
      null,
      { id: 19, number: 19, isReserved: false },
      { id: 20, number: 20, orientation: "west" }
    ],
    [
      { id: 21, number: 21, isReserved: false },
      { id: 22, number: 22, orientation: "east" },
      null,
      { id: 23, number: 23, isReserved: false },
      { id: 24, number: 24, orientation: "west" }
    ],
    [
      { id: 25, number: 25, isReserved: false },
      { id: 26, number: 26, orientation: "east" },
      null,
      { id: 27, number: 27, isReserved: false },
      { id: 28, number: 28, orientation: "west" }
    ],
    [
      { id: 29, number: 29, isReserved: false },
      { id: 30, number: 30, orientation: "east" },
      null,
      { id: 31, number: 31, isReserved: false },
      { id: 32, number: 32, orientation: "west" }
    ],
    [
      { id: 33, number: 33, isReserved: false },
      { id: 34, number: 34, orientation: "east" },
      null,
      { id: 35, number: 35, isReserved: false },
      { id: 36, number: 36, orientation: "west" }
    ],
    [
      { id: 37, number: 37, isReserved: false },
      { id: 38, number: 38, orientation: "east" },
      null,
      { id: 39, number: 39, isReserved: false },
      { id: 40, number: 40, orientation: "west" }
    ],
    [
      { id: 41, number: 41, isReserved: false },
      { id: 42, number: 42, orientation: "east" },
      null,
      { id: 43, number: 43, isReserved: false },
      { id: 44, number: 44, orientation: "west" }
    ],
    [
      { id: 45, number: 45, isReserved: false },
      { id: 46, number: 46, orientation: "east" },
      null,
      { id: 47, number: 47, isReserved: false },
      { id: 48, number: 48, orientation: "west" }
    ]
  ];
  useEffect(() => {
    setRows(seats as Seat[][])
  }, [])

  return (
    <Sheet variant="outlined" sx={{ p: 2, borderRadius: 'sm' }}>
      <Typography level="h4" sx={{ mb: 2 }}>
        Selector de Asientos
      </Typography>
      {showMaxSeatsError && (
        <Alert color="danger">
          <ErrorRounded />
          No puedes seleccionar más de {bookingData.seats} asientos
        </Alert>
      )}
      
      <SeatGrid sx={{ 
        background: `url(/bus.png)` ,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '550px',
        height: '900px',
        padding: 22,
        paddingTop: 32,
        }}>
        {rows.map((row, rowIndex) => (
          row.map((seat: Seat | null, seatIndex) => (
            seat ? (
              <StyledSeat
                key={seat.id}
                className={`
                  ${seat.isSelected ? 'selected' : ''}
                  ${seat.isReserved ? 'reserved' : ''}
                `}
                disabled={seat.isReserved || loading}
                title={seat.tooltip}
                onClick={() => {
                  if (!seat.isSelected) {
                    addSeatCallback(
                      { row: rowIndex, number: seat.number, id: seat.id },
                      () => {
                        setRows(rows.map((row, index) => row.map((s) => s?.id === seat.id ? { ...s, isSelected: true } : s)))
                      }
                    )
                  } else {
                    removeSeatCallback(
                      { row: rowIndex, number: seat.number, id: seat.id },
                      () => {
                        setRows(rows.map((row, index) => row.map((s) => s?.id === seat.id ? { ...s, isSelected: false } : s)))
                      }
                    )
                  }
                }}
              >
                {seat.number}
              </StyledSeat>
            ) : (
              <div key={`empty-${rowIndex}-${seatIndex}`} />
            )
          ))
        ))}
      </SeatGrid>
      
      {loading && (
        <Sheet
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 2
          }}
        >
          <CircularProgress />
        </Sheet>
      )}
    </Sheet>
  )
}
