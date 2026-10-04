"use client"

import { useState } from "react"
import { Info, LayoutGrid, Megaphone, MessagesSquare } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useAdminData } from "@/hooks/use-admin-data"
import type { Train } from "@/@types/admin"
import { AdminHeader } from "./admin-header"
import { AdminStats } from "./admin-stats"
import { BannerForm } from "./banner-form"
import { DeleteTrainDialog } from "./delete-train-dialog"
import { ModerationQueue } from "./moderation-queue"
import { TrainDialog } from "./train-dialog"
import { TrainInfoForm } from "./train-info-form"
import { TrainsTable } from "./trains-table"

export function Dashboard() {
  const { trains, setTrains, banner, setBanner, posts, setPosts } =
    useAdminData()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Train | null>(null)
  const [deleting, setDeleting] = useState<Train | null>(null)

  const pending = posts.filter((p) => p.status === "pending").length
  const approved = posts.filter((p) => p.status === "approved").length

  return (
    <div className="grid min-w-0 gap-4">
      <AdminHeader />
      <AdminStats
        totalTrains={trains.length}
        pending={pending}
        approved={approved}
        bannerActive={banner.active}
      />

      <Tabs defaultValue="banner" className="w-full min-w-0">
        <TabsList
          variant="line"
          className="mb-4 w-full max-w-full justify-start overflow-x-auto"
        >
          <TabsTrigger value="banner" className="shrink-0">
            <Megaphone /> জরুরি ব্যানার
          </TabsTrigger>
          <TabsTrigger value="trains" className="shrink-0">
            <LayoutGrid /> ট্রেন ও সময়সূচি
          </TabsTrigger>
          <TabsTrigger value="posts" className="shrink-0">
            <MessagesSquare /> পোস্ট যাচাই ({pending})
          </TabsTrigger>
          <TabsTrigger value="info" className="shrink-0">
            <Info /> ট্রেনের তথ্য
          </TabsTrigger>
        </TabsList>

        <TabsContent value="banner" className="min-w-0">
          <BannerForm banner={banner} onSave={setBanner} />
        </TabsContent>

        <TabsContent value="trains" className="min-w-0">
          <TrainsTable
            trains={trains}
            onAdd={() => {
              setEditing(null)
              setDialogOpen(true)
            }}
            onEdit={(t) => {
              setEditing(t)
              setDialogOpen(true)
            }}
            onDelete={setDeleting}
          />
        </TabsContent>

        <TabsContent value="posts" className="min-w-0">
          <ModerationQueue
            posts={posts}
            onApprove={(id) =>
              setPosts(
                posts.map((p) =>
                  p.id === id ? { ...p, status: "approved" as const } : p
                )
              )
            }
            onReject={(id) => setPosts(posts.filter((p) => p.id !== id))}
            onDelete={(id) => setPosts(posts.filter((p) => p.id !== id))}
          />
        </TabsContent>

        <TabsContent value="info" className="min-w-0">
          <TrainInfoForm
            trains={trains}
            onSave={(code, description) =>
              setTrains(
                trains.map((t) => (t.code === code ? { ...t, description } : t))
              )
            }
          />
        </TabsContent>
      </Tabs>

      <TrainDialog
        open={dialogOpen}
        editing={editing}
        onClose={() => {
          setDialogOpen(false)
          setEditing(null)
        }}
        onSave={(t, isNew) => {
          setTrains(
            isNew
              ? [...trains, t]
              : trains.map((x) => (x.code === t.code ? t : x))
          )
          setDialogOpen(false)
          setEditing(null)
        }}
      />

      <DeleteTrainDialog
        train={deleting}
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting)
            setTrains(trains.filter((t) => t.code !== deleting.code))
          setDeleting(null)
        }}
      />
    </div>
  )
}
