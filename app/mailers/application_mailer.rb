#allows you to send emails from application using mailer classes and views.
class ApplicationMailer < ActionMailer::Base
  default from: 'the.dog.friendly@gmail.com'
  
  layout 'mailer'
end

#allows you to send emails from application using mailer classes and views.
class UserMailer < ApplicationMailer
  default from: 'the.dog.friendly@gmail.com'
 
  def welcome_email
    @user = params[:user]
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Woof Woof')
  end
  
end