import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'

function CommentDialog({Open,setOpen}) {

  return (
    <div>
      <Dialog open={Open} onOpenChange={()=>setOpen(false)}>
        <DialogContent>
            comment 1
            comment 2
            comment 3
            comment 4

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CommentDialog
