package org.jc.dpwmanager.commands

import org.jc.dpwmanager.models.DpwRoleConstraint
import org.jc.dpwmanager.repository.DpwRoleConstraintRepository

import scala.concurrent.ExecutionContext

case class ConstraintForRoleRetrieveCommand(repository: DpwRoleConstraintRepository, entity: DpwRoleConstraint)(implicit ec: ExecutionContext) extends Command[Short, DpwRoleConstraint, ConstraintForRoleRetrieveResponse](repository, entity){
  override def execute = {
    repository.canRoleExecuteProcess(entity).map(ConstraintForRoleRetrieveResponse(_)) recover {
      case ex => throw ex
    }
  }

  override def toString: String = "Command is ConstraintForRoleRetrieveCommand"
}

case class ConstraintForRoleRetrieveResponse(response: Boolean) extends CommandResponseWrapper[Boolean](response = response)