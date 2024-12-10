import React from 'react'
import Forminput from '../components/Forminput'
import { MenuItem } from '@mui/material'
import { useForm } from 'react-hook-form'
import Formbutton from '../components/Formbutton'
import { Notifies, WebError } from '../utils/utilities'
import { Authposturl, Webapis } from '../utils/webapis'

const DurationTypes = [
  "minutes", "hours", "days"
]

function SettingsForm({settingsData}) {
  const { formState: { isSubmitting, errors }, setValue, register, handleSubmit, watch } = useForm({
    defaultValues: {
      mineBonus: settingsData?.mineBonus ?? '',
      mineDuration: settingsData?.mineDuration ?? '',
      mineDurationType: settingsData?.mineDurationType ?? "",
      luckyboxBonus: settingsData?.luckyboxBonus ?? '',
      luckyboxDuration: settingsData?.luckyboxDuration ?? '',
      luckyboxDurationType: settingsData?.luckyboxDurationType ?? "",
      streakDuration: settingsData?.streakDuration ??'',
      streakDurationType: settingsData?.streakDurationType ?? "",
      referralBonus: settingsData?.referralBonus ?? '',
      referralCount: settingsData?.referralCount ?? '',
      usernameBonus: settingsData?.usernameBonus ?? '',
      facebookBonus: settingsData?.facebookBonus ?? '',
      twitterBonus: settingsData?.twitterBonus ?? '',
      profileAccountBonus: settingsData?.profileAccountBonus ?? '',
      youtubeBonus: settingsData?.youtubeBonus ?? '',
      telegramBonus: settingsData?.telegramBonus ?? '',
      profilePictureBonus: settingsData?.profilePictureBonus ?? '',
      facebookUrl: settingsData?.facebookUrl ?? '',
      twitterUrl: settingsData?.twitterUrl ?? '',
      youtubeUrl: settingsData?.youtubeUrl ?? '',
      telegramUrl: settingsData?.telegramUrl ?? '',
    }
  })

  const watchForm = watch(["mineDurationType", "luckyboxDurationType", "streakDurationType"])

  async function HandleSubmissionAction(values) {
    const sendData = {
      ...values,
      tag: settingsData?.id ? 'update' : 'create',
      id: settingsData?.id ?? null
    }
    try {
      const response = await Authposturl(Webapis.manage_settings, sendData)
      if(![200, 201].includes(response.status)) return Notifies('Request failed', response.message, 'error')
        Notifies('Request Success', response.message, 'success')
    } catch (error) {
      WebError(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(HandleSubmissionAction)}>
        <div className="bg-white p-5 w-[97%] mt-5 mx-auto">
          <div className="font-bold text-2xl mb-5">Mining Settings</div>
          <Forminput {...register('mineBonus', {required: 'Mining bonus is required'})} error={errors.mineBonus} errorMessage={errors.mineBonus?.message} content="Mining Bonus" type="number" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Forminput {...register('mineDuration', {required: 'Mining duration is required'})} error={errors.mineDuration} errorMessage={errors.mineDuration?.message} content="Mining Duration" type="number" />
            <Forminput
              onChange={e => {
                const val = e.target.value
                setValue("mineDurationType", val)
              }}
              value={watchForm[0] || ''}
              {...register('mineDurationType', {required: 'Mining duration type is required'})}
              error={errors.mineDurationType}
              errorMessage={errors.mineDurationType?.message}
              content="Mining Duration Type"
              formtype="select">
              {DurationTypes.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </Forminput>
          </div>
        </div>
        <div className="bg-white p-5 w-[97%] mt-5 mx-auto">
          <div className="font-bold text-2xl mb-5">Luckbox Settings</div>
          <Forminput {...register('luckyboxBonus', {required: 'Luckybox bonus is required'})} error={errors.luckyboxBonus} errorMessage={errors.luckyboxBonus?.message} content="Luckbox Bonus" type="number" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Forminput {...register('luckyboxDuration', {required: 'Luckybox duration is required'})} error={errors.luckyboxDuration} errorMessage={errors.luckyboxDuration?.message} content="Luckbox Duration" type="number" />
            <Forminput 
              onChange={e => {
                const val = e.target.value
                setValue("luckyboxDurationType", val)
              }}
              value={watchForm[1] || ''}
            {...register('luckyboxDurationType', {required: 'Lucky box duration type is required'})} 
            error={errors.luckyboxDurationType}
            errorMessage={errors.luckyboxDurationType?.message}
            content="Luckbox Duration Type" 
            formtype="select">
              {DurationTypes.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </Forminput>
          </div>
        </div>
        <div className="bg-white p-5 w-[97%] mt-5 mx-auto">
          <div className="font-bold text-2xl mb-5">Streak Settings</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Forminput {...register('streakDuration', {required: 'Streak duration is required'})} error={errors.streakDuration} errorMessage={errors.streakDuration?.message} content="Streak Duration" type="number" />
            <Forminput 
              onChange={e => {
                const val = e.target.value
                setValue("streakDurationType", val)
              }}
              value={watchForm[2] || ''}
            {...register('streakDurationType', {required: 'Streak duration type is required'})} 
            error={errors.streakDurationType}
            errorMessage={errors.streakDurationType?.message}
            content="Streak Duration Type" 
            formtype="select">
              {DurationTypes.map((type, index) => (
                <MenuItem key={index} value={type}>{type}</MenuItem>
              ))}
            </Forminput>
          </div>
        </div>
        <div className="bg-white p-5 w-[97%] mt-5 mx-auto">
          <div className="font-bold text-2xl mb-5">Referral Settings</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Forminput {...register('referralBonus', {required: 'Referral bonus is required'})} error={errors.referralBonus} errorMessage={errors.referralBonus?.message} content="Referral Bonus" type="number" />
            <Forminput {...register('referralCount', {required: 'Total to be referred for bonus is required'})} error={errors.referralCount} errorMessage={errors.referralCount?.message} content="Referral Count" type="number" />
          </div>
        </div>
        <div className="bg-white p-5 w-[97%] mt-5 mx-auto">
          <div className="font-bold text-2xl mb-5">Achievments Settings</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <Forminput error={errors.usernameBonus} errorMessage={errors.usernameBonus?.message} {...register('usernameBonus', {required: 'Username bonus is required'})} content="Username Bonus" type="number" />
            <Forminput error={errors.profileAccountBonus} errorMessage={errors.profileAccountBonus?.message} {...register('profileAccountBonus', {required: 'Profile account bonus is required'})} content="Profile Account Bonus" type="number" />
            <Forminput error={errors.profilePictureBonus} errorMessage={errors.profilePictureBonus?.message} {...register('profilePictureBonus', {required: 'Profile picture bonus is required'})} content="Profile Picture Bonus" type="number" />
            <Forminput error={errors.facebookBonus} errorMessage={errors.facebookBonus?.message} {...register('facebookBonus', {required: 'Facebook bonus is required'})} content="Facebook Bonus" type="number" />
            <Forminput error={errors.twitterBonus} errorMessage={errors.twitterBonus?.message} {...register('twitterBonus', {required: 'Twitter bonus is required'})} content="Twitter Bonus" type="number" />
            <Forminput error={errors.youtubeBonus} errorMessage={errors.youtubeBonus?.message} {...register('youtubeBonus', {required: 'Youtube bonus is required'})} content="Youtube Bonus" type="number" />
            <Forminput error={errors.telegramBonus} errorMessage={errors.telegramBonus?.message} {...register('telegramBonus', {required: 'Telegram bonus is required'})} content="Telegram Bonus" type="number" />
            <Forminput error={errors.telegramUrl} errorMessage={errors.telegramUrl?.message} {...register('telegramUrl', {required: 'Telegram Url is required'})} content="Telegram Url"/>
            <Forminput error={errors.youtubeUrl} errorMessage={errors.youtubeUrl?.message} {...register('youtubeUrl', {required: 'Youtube Url is required'})} content="Youtube Url"/>
            <Forminput error={errors.facebookUrl} errorMessage={errors.facebookUrl?.message} {...register('facebookUrl', {required: 'Facebook Url is required'})} content="Facebook Url"/>
            <Forminput error={errors.twitterUrl} errorMessage={errors.twitterUrl?.message} {...register('twitterUrl', {required: 'Twitter Url is required'})} content="Twitter Url"/>
          </div>
        </div>
        <div className="grid grid-cols-2 p-5 mt-5">
          <div></div>
          <div className=''> <Formbutton title="Submit" loading={isSubmitting} /> </div>
        </div>
      </form>
    </div>
  )
}

export default SettingsForm


