import React, { useCallback, useEffect, useState } from 'react'
import { Notifies, WebError } from '../utils/utilities'
import { Authgeturl, Authputurl, Webapis } from '../utils/webapis'
import moment from 'moment'
import img from "../assets/default.png"
import { Dialog, DialogContent, DialogTitle, MenuItem } from '@mui/material'
import Forminput from '../components/Forminput'
import Formbutton from '../components/Formbutton'
import {useForm} from 'react-hook-form'
import {useSearchParams} from 'react-router-dom'
import CustomTablePagination from '../components/CustomTablePagination'

const TableHeaders = [
  "Username",
  "Full Name",
  "Suspend",
  "Verified",
  "Status",
  "Role",
  "Balance",
  "Date Created",
]

const OptionsTag = [
  "true",
  "false"
]
const RoleOptions = [
  "user",
  "admin"
]

function Users() {
  const [screen, setScreen] = useState(1)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})
  const [text, setText] = useState('')
  const [view, setView] = useState({ status: false, data: {} })
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('page')
  const {register, handleSubmit, watch, setValue, formState: {errors, isSubmitting}} = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      balance: 0,
      refBalance: 0,
      suspend: '',
      role: '',
    }
  })
  const watchForm = watch(["suspend", "role"])

  const FetchUsers = useCallback(async (tag) => {
    try {
      const response = await Authgeturl(`${Webapis.all_users}?p=${search ?? 1}${tag ? `&search=${tag}` : ''}`)
      if (response.status !== 200) return false
      setData(response.data)
    } catch (error) {
      WebError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    FetchUsers("")
  }, [FetchUsers])

  function HandleView() {
    setView({ status: false, data: {} })
    setScreen(1)
  }

  function OpenView(item) {
    setView({ status: true, data: item })
    setValue("firstname", item.firstname)
    setValue("lastname", item.lastname)
    setValue("balance", item.balance)
    setValue("refBalance", item.refBalance)
    setValue("suspend", item.suspend)
    setValue("role", item.role)
  }

  async function SubmitAction(values) {
    try {
      const sendData = {
        ...values,
        id: view.data?.id
      }
      const response = await Authputurl(Webapis.user_management, sendData)
      if(response.status !== 200) return Notifies('Request failed', response.message, 'error')
        Notifies('Request Successful', response.message, 'success')
        HandleView()
      FetchUsers("")
    } catch (error) {
      HandleView()
      WebError(error)
    }
  }

  function HandlePagin(num) {
    setSearchParams({ page: num })
  }

  function HandleSearching() {
    if (!text) return FetchUsers("")
    return FetchUsers(text)
  }

  function ClearSearch() {
    setText('')
    return FetchUsers("")
  }


  if (loading) return (
    <div className='w-[97%] mx-auto mt-5'>
      <div className="overflow-x-auto scrollsdown">
        <div className="w-full">
          <table className="w-full table">
            <thead>
              <tr className='bg-slate-800 text-white'>
                {TableHeaders.map((item, index) => (
                  <td key={index} className='text-sm truncate p-3'>{item}</td>
                ))}
              </tr>
            </thead>
          </table>
          <div className="text-center">Loading Data...</div>
        </div>
      </div>
    </div>
  )
  return (
    <>
      <Dialog
        open={view.status}
        onClose={HandleView}
      >
        <DialogTitle id="alert-dialog-title">
          {view.data?.firstname} Details
        </DialogTitle>
         {screen === 1 && <DialogContent className='w-[30rem]' id="alert-dialog-description">
            <div className="w-fit mx-auto">
              <img src={view.data?.image ?? img} alt="" className="size-20 rounded-full object-cover" />
            </div>
            <div className="grid grid-cols-2 p-3 border-b text-xs">
              <div className="">Full Name</div>
              <div className="text-right">{view.data?.firstname} {view.data?.lastname}</div>
            </div>
            <div className="grid grid-cols-2 p-3 border-b text-xs">
              <div className="">UserName</div>
              <div className="text-right">{view.data?.username}</div>
            </div>
            <div className="grid grid-cols-2 p-3 border-b text-xs">
              <div className="">Account Balance</div>
              <div className="text-right">{view.data?.balance}</div>
            </div>
            <div className="grid grid-cols-2 p-3 border-b text-xs">
              <div className="">Referral Balance</div>
              <div className="text-right">{view.data?.refBalance}</div>
            </div>
            <div className="grid grid-cols-2 p-3 border-b text-xs">
              <div className="">Phone Number</div>
              <div className="text-right">{view.data?.phone}</div>
            </div>
            <div className="grid grid-cols-2 p-3 border-b text-xs">
              <div className="">Email address</div>
              <div className="text-right">{view.data?.email}</div>
            </div>
            <div className="grid grid-cols-2 p-3 border-b text-xs">
              <div className="">Email verified</div>
              <div className="text-right">{view.data?.emailVerified}</div>
            </div>
            <div className="grid grid-cols-2 p-3 border-b text-xs">
              <div className="">Address</div>
              <div className="text-right">{view.data?.address}</div>
            </div>
            <div className="grid grid-cols-2 p-3 border-b text-xs">
              <div className="">Account Suspended</div>
              <div className="text-right">{view.data?.suspend}</div>
            </div>
            <div className="grid grid-cols-2 p-3 border-b text-xs">
              <div className="">Acccount Type</div>
              <div className="text-right">{view.data?.role}</div>
            </div>
            <div className="grid grid-cols-2 p-3 border-b text-xs">
              <div className="">Date Registered</div>
              <div className="text-right">{moment(view.data?.createdAt).calendar()}</div>
            </div>
            <div className="grid grid-cols-2 p-3 text-sm">
              <div className=""></div>
              <div className="text-right"> <button onClick={() => setScreen(2)} className="bg-primary py-2 px-4 rounded-md text-white">Edit Data</button> </div>
            </div>
          </DialogContent>}
          {screen === 2 && <DialogContent className='w-[30rem]'>
            <div className="">
              <form onSubmit={handleSubmit(SubmitAction)}>
                <Forminput {...register("firstname", {required: 'Firstname cannot be empty'})} error={errors.firstname} errorMessage={errors.firstname?.message} content="First Name" />
                <Forminput {...register("lastname", {required: 'Lastname cannot be empty'})} error={errors.lastname} errorMessage={errors.lastname?.message} content="Last Name" />
                <Forminput {...register("balance", {required: 'Balance cannot be empty'})} error={errors.balance} errorMessage={errors.balance?.message} content="Balance" />
                <Forminput {...register("refBalance", {required: 'Referral balance cannot be empty'})} error={errors.refBalance} errorMessage={errors.refBalance?.message} content="Ref. Balance" />
                <Forminput {...register("suspend", {required: 'Account state cannot be empty'})} error={errors.suspend} errorMessage={errors.suspend?.message} value={watchForm[0] ?? ''} content="Suspend Account" formtype="select">
                  {OptionsTag.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </Forminput>
                <Forminput {...register("role", {required: 'Account type cannot be empty'})} error={errors.role} errorMessage={errors.role?.message} value={watchForm[1] ?? ''} content="Account Type" formtype="select">
                  {RoleOptions.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  ))}
                </Forminput>
                <div className="grid grid-cols-2">
                  <div className=""></div>
                <div className=""> <Formbutton title="Submit" loading={isSubmitting} /> </div>
                </div>
              </form>
            </div>
          </DialogContent> }
      </Dialog>

      <div className='w-[97%] mx-auto mt-5'>
        <div className="mb-5">
          <div className="font-bold text-xl">All Users ({data.length})</div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className=""></div>
        <div className="flex items-center justify-end gap-5">
          <div className="flex items-center border rounded-xl bg-white shadow-xl">
            <input value={text} onChange={e => setText(e.target.value)} type="text" placeholder="Search aything here..." className="outline-none w-full border-none bg-transparent p-2" />
            <button onClick={HandleSearching} className="py-3 px-7 capitalize text-white bg-primary rounded-tr-xl rounded-br-xl">search</button>
          </div>
         {text && <button onClick={ClearSearch} className="py-3 px-4 bg-slate-400 text-white rounded-md">Clear</button>}
        </div>
      </div>

        <div className="overflow-x-auto scrollsdown">
          <div className="w-full">
            <table className="w-full table">
              <thead>
                <tr className='bg-slate-800 text-white'>
                  {TableHeaders.map((item, index) => (
                    <td key={index} className='text-sm truncate p-3'>{item}</td>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {data.map((item, index) => (
                  <tr key={index} className='border-b text-xs cursor-pointer' onClick={() => OpenView(item)}>
                    <td className="p-3 truncate">{item.username ?? '---'}</td>
                    <td className="p-3 truncate">{item.firstname} {item.lastname}</td>
                    <td className="p-3 truncate">{item.suspend}</td>
                    <td className="p-3 truncate">{item.emailVerified}</td>
                    <td className="p-3 truncate">{item.status}</td>
                    <td className="p-3 truncate">{item.role}</td>
                    <td className="p-3 truncate">{item.balance}</td>
                    <td className="p-3 truncate">{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      <CustomTablePagination
        onChange={HandlePagin}
        page={search}
        perPage={data.page_size}
        total={data.total}
      />
      </div>
    </>
  )
}

export default Users

