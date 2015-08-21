class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  # Rails ではＣＳＲＦの対策が入っていて、ＣＳＲＦtoken が一致しな場合には例外を投げる
  # という動作をする。　curl で POST するため、一致しない場合はセッションを空にするよう
  # 変更する。
  protect_from_forgery with: :null_session
end
